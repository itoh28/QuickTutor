<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Http\Requests\UploadMediaRequest;
use App\Http\Resources\MediaResource;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function upload(UploadMediaRequest $request)
    {
        $file = $request->file('file');
        $path = Storage::disk('s3')->put('media', $file);
        if (!$path) {
            Log::error('File upload failed.');
            return response()->json(['error' => 'File upload failed'], 500);
        }
        Log::info('File uploaded successfully: ' . $path);

        $bucketName = env('AWS_BUCKET', 'quick-tutor');
        $endpoint = rtrim(env('AWS_ENDPOINT', 'http://localhost:9000'), '/');
        $mediaUrl = "{$endpoint}/{$bucketName}/{$path}";
        Log::info('Generated media URL: ' . $mediaUrl);

        $media = new Media([
            'step_image_url' => in_array($file->getClientOriginalExtension(), ['mp4', 'mov']) ? null : $mediaUrl,
            'step_video_url' => in_array($file->getClientOriginalExtension(), ['mp4', 'mov']) ? $mediaUrl : null,
            's3_key' => $path,
            'file_size' => $file->getSize(),
            'content_type' => $file->getMimeType(),
        ]);

        if (!$media->save()) {
            Log::error('Failed to save media record.');
            return response()->json(['error' => 'Failed to save media record'], 500);
        }

        Log::info('Media record saved successfully.', ['media' => $media]);
        return response()->json(['data' => new MediaResource($media)], 201);
    }
}
