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
            'name' => 'EETT', 'path' => 'eett', 'icon' => 'fa fa-wrench', 'component' => 'eett/Index', 'slug' => '/eett',
            'children' => [
                ['slug' => '/eett/overview', 'name'=>'EETT Overview', 'path' => 'overview', 'icon' => 'dashboard', 'component' => 'tools/Overview'],
                ['slug' => '/eett/delta-report', 'name'=>'EETT Delta Report', 'path' => 'delta-report', 'icon' => 'report', 'component' => 'tools/DeltaReport'],
                ['slug' => '/eett/scripts', 'name'=>'EETT Scripts', 'path' => 'scripts', 'icon' => 'code', 'component' => 'tools/Scripts'],
                ['slug' => '/eett/log', 'name'=>'EETT Log', 'path' => 'log', 'icon' => 'chat', 'component' => 'tools/Log'],
            ]
        ]);

        Page::create([
            'slug'=>'/documentation', 'name' => 'Documentation', 'path' => 'documentation', 'icon' => 'fa fa-file', 'component' => 'Documentation'
        ]);

        Page::create([
            'slug'=>'/info', 'name' => 'Info', 'path' => 'info', 'icon' => 'fa fa-info', 'component' => 'Info'
        ]);

        Page::create([
            'slug'=>'/users', 'name'=>'Users', 'path' => 'users', 'icon' => 'person', 'component' => 'Users'
        ]);
    }
}
