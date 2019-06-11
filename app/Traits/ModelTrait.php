<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait ModelTrait
{
    public function getColumns()
    {
        $columns = [];
        $schema = DB::getDoctrineSchemaManager()->listTableColumns($this->table);

        foreach ($schema as $sch) {
            if (in_array($sch->getName(), $this->tableData)) {
                $columns[] = [
                    'title' => $sch->getName(),
                    'sortable' => in_array($sch->getName(), $this->sortable),
                    'filterable' => in_array($sch->getName(), $this->filterable),
                    'editable' => in_array($sch->getName(), $this->editable),
                    'type'=> $sch->getType(),
                ];
            }
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
