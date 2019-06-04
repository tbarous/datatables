<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="{{ asset('css/auth.css') }}" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js"></script>
    <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.2/css/mdb.min.css" rel="stylesheet"> -->
</head>
<body>
	<div id="app">
		  @yield('content')
	</div>
  
    <script>
    	var app = new Vue({
  		el: '#app',
		  data: {
		    message: 'Hello Vue!'
		  }
		})
    </script>
</body>
</html>