<!DOCTYPE html>
<html lang="en" style="overflow-y: hidden;">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
	
	<script>
		window.login = @json(route('login'));
	</script>

    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="{{ asset('css/auth.css') }}" rel="stylesheet">
    <script src="{{ asset('js/auth/app.js') }}" defer></script>
    <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
</head>
<body>
	<div id="app">
		<login></login>
	</div>
</body>
</html>