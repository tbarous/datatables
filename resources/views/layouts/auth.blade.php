<!DOCTYPE html>
<html lang="en" style="    overflow-y: hidden;">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="{{ asset('css/auth.css') }}" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js"></script>
    <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.2/css/mdb.min.css" rel="stylesheet"> -->
	<style>
		#app{
		    display: flex;
		    align-items: center;
		    height: 100vh;
		   	font-family: 'Nunito'!important;
		    background-image: url('/images/tel.jpg');
		    background-size: cover;
		    overflow: hidden;
		    box-shadow: inset 0 0 20px rgba(0,0,0,0.9);
		}

		.overlay{
			position: absolute;
			height: 100%;
			width: 100%;
			background: rgba(0,0,0,0.3)
		}

		input, button{
		    height: 50px!important;
	        font-size: 19px!important;
		}
	</style>
</head>
<body>
	<div id="app">
		<div class="overlay"></div>
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