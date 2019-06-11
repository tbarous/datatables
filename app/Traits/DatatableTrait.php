<?php

namespace App\Traits;

trait DatatableTrait
{
    public function getColumns()
    {
        $columns = [];
        
        foreach ($this->names as $column) {
            $columns[] = [
                'title' => $column,
                'sortable' => in_array($column, $this->sortable),
                'filterable' => in_array($column, $this->filterable),
                'editable' => in_array($column, $this->editable),
                'type'=> $column,
                'active' => true,
                'query' => ''
            ];
        }

        return $columns;
    }

    public function getData()
    {
        $data = [
            'columns' => $this->getColumns(),
            'url' => 'api/' . $this->table
        ];

        return $data;
    }
}
