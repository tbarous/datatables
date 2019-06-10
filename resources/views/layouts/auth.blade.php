<!DOCTYPE html>
<html lang="en" style="    overflow-y: hidden;">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="{{ asset('css/auth.css') }}" rel="stylesheet">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
</head>
<body>
	<div id="app">
		<div class="overlay"></div>
		@yield('content')
	</div>

	<script>
		$('form').one('submit', function(e) {
		    e.preventDefault();
		    $('#loading').css('opacity', '1');
		    setTimeout(()=>{
		    	$(this).submit();
		    }, 500);
		});
	</script>
</body>
</html>