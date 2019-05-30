const mix = require('laravel-mix');

mix.js('resources/js/eett/app.js', 'public/js')
    .sass('resources/sass/eett/app.scss', 'public/css')
    .sass('resources/sass/auth/auth.scss', 'public/css')