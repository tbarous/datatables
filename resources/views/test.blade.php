<?php

foreach ($columns as $column) {
    // echo $column->getName() . ': ' . $column->getType() . "\n";

    echo $column->getColumnDefinition();
}
