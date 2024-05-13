<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $data = [
            'id' => $this->id,
            's3Key' => $this->s3_key,
            'fileSize' => $this->file_size,
            'contentType' => $this->content_type,
            'stepImageUrl' => $this->step_image_url ?? null,
            'stepVideoUrl' => $this->step_video_url ?? null,
        ];

        return $data;
    }
}
