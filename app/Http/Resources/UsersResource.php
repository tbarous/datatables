<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class UsersResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'username'       => $this->username,
            'email'      => $this->email,
            'created_at'    => Carbon::parse($this->created_at)->toDayDateTimeString(),
            'created_at' => Carbon::parse($this->updated_at)->toDayDateTimeString(),
        ];
    }
}