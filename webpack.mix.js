const mix = require('laravel-mix');

mix.js('resources/js/app/app.js', 'public/js/app')
    .stylus('resources/stylus/eett/app.styl', 'public/css')
    .js('resources/js/auth/app.js', 'public/js/auth')
    .stylus('resources/stylus/auth/auth.styl', 'public/css')