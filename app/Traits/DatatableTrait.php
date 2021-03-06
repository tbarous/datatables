<?php

namespace App\Traits;

use Carbon\Carbon;

trait DatatableTrait
{
    public function getColumns()
    {
        $columns = [];
        foreach ($this->names as $key => $column) {
            $columns[] = [
                'title' => $column,
                'sortable' => in_array($column, $this->sortable),
                'filterable' => in_array($column, $this->filterable),
                'editable' => in_array($column, $this->editable),
                'type'=> $column,
                'active' => true,
                'query' => '',
                'value' => $this->values[$key]
            ];
        }

        return $columns;
    }

    public function getLastUpdated()
    {
        return Carbon::parse($this->max('updated_at'))->format('d/m/Y - H:i:s a');
    }

    public function getData()
    {
        return [
            'columns' => $this->getColumns(),
            'resourceURL' => $this->url,
            'filters' => $this->filters,
            'last_update' => $this->getLastUpdated(),
            'crud' => $this->crud,
            'files' => $this->files
        ];
    }
}
