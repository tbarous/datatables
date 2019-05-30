<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="{{ asset('css/auth.css') }}" rel="stylesheet">
</head>
<body style="background-image: linear-gradient(113.7deg, rgba(43, 58, 103, 1) 11.5%, rgba(122, 134, 172, 1) 124.1%);height: 100vh;">
    
    @yield('content')
</body>
</html>