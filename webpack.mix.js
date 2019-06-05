const mix = require('laravel-mix');

mix.js('resources/js/eett/app.js', 'public/js')
    .stylus('resources/stylus/eett/app.styl', 'public/css')
    .stylus('resources/stylus/auth/auth.styl', 'public/css')