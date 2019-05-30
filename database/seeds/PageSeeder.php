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
        $node = Page::create([
            'name' => 'tools', 'path' => 'tools', 'icon' => 'fa fa-wrench', 'component' => 'Tools',
            'children' => [
                ['name'=>'EETT Overview', 'path' => 'eett-overview', 'icon' => 'dashboard', 'component' => 'tools/Overview'],
                ['name'=>'EETT Delta Report', 'path' => 'eett-delta-report', 'icon' => 'report', 'component' => 'tools/deltaReport'],
                ['name'=>'EETT Scripts', 'path' => 'eett-scripts', 'icon' => 'code', 'component' => 'tools/Scripts'],
                ['name'=>'EETT Log', 'path' => 'log', 'icon' => 'chat', 'component' => 'tools/Log'],
                ['name'=>'Users', 'path' => 'users', 'icon' => 'person', 'component' => 'tools/Users']
            ]
        ]);

        Page::create([
            'name' => 'documentation', 'path' => 'documentation', 'icon' => 'fa fa-file', 'component' => 'Documentation'
        ]);

        Page::create([
            'name' => 'info', 'path' => 'info', 'icon' => 'fa fa-info', 'component' => 'Info'
        ]);
    }
}
