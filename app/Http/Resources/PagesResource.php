<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class PageResource extends JsonResource
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
            'name'   => $this->name,
            'created_at' => Carbon::parse($this->created_at)->format('d/m/Y - H:i:s', 'Europe/Athens'),
            'updated_at' => Carbon::parse($this->updated_at)->format('d/m/Y - H:i:s', 'Europe/Athens')
        ];
    }
}
