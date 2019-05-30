<?php

use App\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Page::create([
            'name' => 'EETT', 'path' => '/eett', 'icon' => 'fa fa-wrench',  'slug' => '/eett','component' => 'eett/Index', 'redirect'=>'/eett/overview',
            'children' => [
                ['slug' => '/eett/overview', 'name'=>'EETT Overview', 'path' => 'overview', 'icon' => 'dashboard', 'component' => 'eett/Overview'],
                ['slug' => '/eett/delta-report', 'name'=>'EETT Delta Report', 'path' => 'delta-report', 'icon' => 'report', 'component' => 'eett/DeltaReport'],
                ['slug' => '/eett/scripts', 'name'=>'EETT Scripts', 'path' => 'scripts', 'icon' => 'code', 'component' => 'eett/Scripts'],
                ['slug' => '/eett/log', 'name'=>'EETT Log', 'path' => 'log', 'icon' => 'chat', 'component' => 'eett/Log'],
            ]
        ]);

        Page::create([
            'name' => 'Mass Update', 'path' => '/mass-update', 'icon' => 'fa fa-edit',  'slug' => '/mass-update','component' => 'mass-update/Index', 'redirect'=>'/mass-update/overview',
            'children' => [
                [
                    'slug' => '/mass-update/sites', 'name'=>'Sites', 'path' => 'sites', 'icon' => 'dashboard', 'component' => 'eett/Overview',
                    'children' => [
                        [
                            'slug' => '/mass-update/sites/down', 'name'=>'Sites Down', 'path' => 'down', 'icon' => 'fa fa-chevron-down', 'component' => 'mass-update/sites/Down'
                        ],
                    ]
                ],
                [
                    'slug' => '/mass-update/cells', 'name'=>'Cells', 'path' => 'cells', 'icon' => 'fa fa-cell', 'component' => 'eett/Overview',
                    'children' => [
                        [
                            'slug' => '/mass-update/cells/down', 'name'=>'Cells Down', 'path' => 'down', 'icon' => 'fa fa-chevron-down', 'component' => 'mass-update/cells/Down'
                        ],
                    ]
                ],
            ]
        ]);

        Page::create([
            'slug'=>'/documentation', 'name' => 'Documentation', 'path' => '/documentation', 'icon' => 'fa fa-file', 'component' => 'Documentation'
        ]);

        Page::create([
            'slug'=>'/info', 'name' => 'Info', 'path' => '/info', 'icon' => 'fa fa-info', 'component' => 'Info'
        ]);

        Page::create([
            'slug'=>'/users', 'name'=>'Users', 'path' => '/users', 'icon' => 'person', 'component' => 'Users'
        ]);
    }
}
