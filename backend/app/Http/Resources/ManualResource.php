<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ManualResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'manualTitle' => $this->manual_title,
            'isDraft' => $this->is_draft,
            'createdAt' => $this->created_at->toDateTimeString(),
            'updatedAt' => $this->updated_at->toDateTimeString(),
            'users' => $this->whenLoaded('users', function () {
                return $this->users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'username' => $user->username,
                        'manualUpdatedAt' => $user->pivot->updated_at->toDateTimeString(),
                    ];
                });
            }),
            'genres' => GenreResource::collection($this->whenLoaded('genres')),
            'steps' => StepResource::collection($this->whenLoaded('steps')),
            'media' => new MediaResource($this->whenLoaded('media')),
            'lastUpdatedBy' => $this->additional['last_updated_by'] ?? null,
            'lastUpdatedAt' => $this->additional['last_updated_at'] ?? null
        ];

        if ($this->deleted_at) {
            $data['deletedAt'] = $this->deleted_at->toDateTimeString();
        }

        return $data;
    }
}
