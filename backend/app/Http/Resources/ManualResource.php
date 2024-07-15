<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ManualResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $lastUpdatedUser = $this->users->sortByDesc('pivot.updated_at')->first();
        $lastUpdatedBy = $lastUpdatedUser ? $lastUpdatedUser->username : $this->users->first()->username;
        $lastUpdatedAt = $lastUpdatedUser ? $lastUpdatedUser->pivot->updated_at->toDateTimeString() : $this->created_at->toDateTimeString();

        return [
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
            'lastUpdatedBy' => $lastUpdatedBy,
            'lastUpdatedAt' => $lastUpdatedAt,
            'deletedAt' => $this->deleted_at ? $this->deleted_at->toDateTimeString() : null,
        ];
    }
}
