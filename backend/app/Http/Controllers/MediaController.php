<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Http\Requests\UploadMediaRequest;
use App\Http\Resources\MediaResource;
use Illuminate\Support\Facades\Log;
use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;
use Exception;

class MediaController extends Controller
{
    public function upload(UploadMediaRequest $request)
    {
        Log::info('Upload request received');

        $file = $request->file('file');
        if (!$file) {
            Log::error('No file found in the request.');
            return response()->json(['error' => 'No file found in the request'], 400);
        }

        $filePath = 'media/' . $file->getClientOriginalName();

        $region = env('AWS_DEFAULT_REGION');
        $accessKey = env('AWS_ACCESS_KEY_ID');
        $secretKey = env('AWS_SECRET_ACCESS_KEY');
        $bucket = env('AWS_BUCKET');

        // 環境変数の値をログに出力
        Log::info('AWS_DEFAULT_REGION: ' . $region);
        Log::info('AWS_ACCESS_KEY_ID: ' . $accessKey);
        Log::info('AWS_SECRET_ACCESS_KEY: ' . $secretKey);
        Log::info('AWS_BUCKET: ' . $bucket);

        // 残りの処理はそのまま
        $s3 = new S3Client([
            'version' => 'latest',
            'region' => $region,
            'credentials' => [
                'key' => $accessKey,
                'secret' => $secretKey,
            ],
        ]);

        try {
            Log::info('Attempting to upload file to S3: ' . $filePath);
            Log::info('File path: ' . $file->getPathname());
            Log::info('File type: ' . $file->getMimeType());
            Log::info('File size: ' . $file->getSize());

            $result = $s3->putObject([
                'Bucket' => $bucket,
                'Key' => $filePath,
                'SourceFile' => $file->getPathname(),
                'ContentType' => $file->getMimeType(),
            ]);

            Log::info('S3 putObject result: ' . json_encode($result));

            if (empty($result['ObjectURL'])) {
                Log::error('File upload failed: ' . $filePath);
                return response()->json(['error' => 'File upload failed'], 500);
            }

            Log::info('File uploaded successfully: ' . $result['ObjectURL']);

            $mediaUrl = $result['ObjectURL'];

            $media = new Media([
                'step_image_url' => in_array($file->getClientOriginalExtension(), ['mp4', 'mov']) ? null : $mediaUrl,
                'step_video_url' => in_array($file->getClientOriginalExtension(), ['mp4', 'mov']) ? $mediaUrl : null,
                's3_key' => $filePath,
                'file_size' => $file->getSize(),
                'content_type' => $file->getMimeType(),
            ]);

            if (!$media->save()) {
                Log::error('Failed to save media record.');
                return response()->json(['error' => 'Failed to save media record'], 500);
            }

            Log::info('Media record saved successfully.', ['media' => $media]);
            return response()->json(['data' => new MediaResource($media)], 201);
        } catch (S3Exception $e) {
            Log::error('S3Exception occurred while uploading file to S3: ' . $e->getAwsErrorMessage(), ['exception' => $e]);
            Log::error('AWS Error Code: ' . $e->getAwsErrorCode());
            Log::error('HTTP Status Code: ' . $e->getStatusCode());
            Log::error('Error Type: ' . $e->getAwsErrorType());
            Log::error('Request ID: ' . $e->getAwsRequestId());
            Log::error($e->getTraceAsString());
            return response()->json(['error' => 'File upload failed with S3 exception'], 500);
        } catch (Exception $e) {
            Log::error('Exception occurred while uploading file to S3: ' . $e->getMessage(), ['exception' => $e]);
            Log::error($e->getTraceAsString());
            return response()->json(['error' => 'File upload failed with exception'], 500);
        }
    }
}
