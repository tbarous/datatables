<?php

use App\Models\Page;
use Illuminate\Database\Seeder;

class PagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Page::create([
            'name' => 'EETT',
            'path' => '/eett',
            'icon' => 'fa fa-wrench',
            'slug' => '/eett',
            'component' => 'eett/Index',
            'redirect'=>'/eett/overview',
            'menu' => true,
            'children' => [
                [
                    'slug' => '/eett/overview',
                    'name'=>'Overview',
                    'path' => 'overview',
                    'icon' => 'dashboard',
                    'component' => 'eett/Overview',
                    'menu' => true,
                ],
                [
                    'slug' => '/eett/delta-report',
                    'name'=>'Delta Report',
                    'path' => 'delta-report',
                    'icon' => 'report',
                    'component' => 'eett/DeltaReport',
                    'menu' => true,
                ],
                [
                    'slug' => '/eett/scripts',
                    'name'=> 'Scripts',
                    'path' => 'scripts',
                    'icon' => 'code',
                    'component' => 'eett/Scripts',
                    'menu' => true,
                ],
                [
                    'slug' => '/eett/log',
                    'name'=>'Log',
                    'path' => 'log',
                    'icon' => 'chat',
                    'component' => 'eett/Log',
                    'menu' => true,
                ],
            ]
        ]);

        Page::create([
            'name' => 'Mass Update',
            'path' => '/mass-update',
            'icon' => 'fa fa-edit',
            'slug' => '/mass-update',
            'component' => 'mass-update/Index',
            'redirect'=>'/mass-update/overview',
            'menu' => true,
            'children' => [
                [
                    'slug' => '/mass-update/sites',
                    'name'=>'Sites',
                    'path' => 'sites',
                    'icon' => 'dashboard',
                    'component' => 'mass-update/Sites',
                    'menu' => true,
                ],
                [
                    'slug' => '/mass-update/cells',
                    'name'=>'Cells',
                    'path' => 'cells',
                    'icon' => 'fa fa-cell',
                    'component' => 'mass-update/Cells',
                    'menu' => true,
                ],
            ]
        ]);

        Page::create([
            'slug'=>'/',
            'name' => '',
            'path' => '/',
            'menu' => false,
            'icon' => 'fa fa-file',
            'component' => 'eett/Index'
        ]);

        Page::create([
            'slug'=>'/documentation',
            'name' => 'Documentation',
            'path' => '/documentation',
            'menu' => true,
            'icon' => 'fa fa-file',
            'component' => 'General/Documentation'
        ]);

        Page::create([
            'slug'=>'/info',
            'name' => 'Info',
            'menu' => true,
            'path' => '/info',
            'icon' => 'fa fa-info',
            'component' => 'General/Info'
        ]);

        Page::create([
            'slug'=>'/users',
            'name'=>'Users',
            'path' => '/users',
            'menu' => true,
            'icon' => 'person',
            'component' => 'General/Users'
        ]);

        Page::create([
            'slug'=>'/pages',
            'name'=>'Pages',
            'path' => '/pages',
            'menu' => true,
            'icon' => 'fa fa-file',
            'component' => 'General/Pages'
        ]);

        Page::create([
            'slug'=>'/404',
            'name'=>'404',
            'path' => '*',
            'menu' => false,
            'icon' => 'fa fa-file',
            'component' => 'General/404'
        ]);
    }
}
