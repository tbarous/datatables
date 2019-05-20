<?php

namespace App\Http\Resources;

use App\User;
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
            'id'   => $this->id,
            'username'   => $this->username,
            'email'      => $this->email,
            'created_at' => Carbon::parse($this->created_at)->format('d/m/Y - H:i:s', 'Europe/Athens'),
            'updated_at' => Carbon::parse($this->updated_at)->format('d/m/Y - H:i:s', 'Europe/Athens')
        ];
    }
}
