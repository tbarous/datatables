@extends('layouts.auth')
@section('content')
    <div style="z-index: 9999999;width: 400px;">
        <h1>VICTUS NETWORKS</h1>

        <div class="mt-5 pb-5">
            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div class="mt-3">
                    <div>
                        <label for="username">Username</label>
                    </div>
                    
                    <div>
                        <input class="form-control w-100" id="username" type="text" name="username" value="{{ old('username') }}" required autofocus>
                    </div>
                </div>

                <div class="mt-3">
                    <div>
                        <label for="password">Password</label>
                    </div>
                    
                    <div>
                        <input class="form-control w-100" id="password" type="password" name="password" required autocomplete="current-password">
                    </div>
                </div>

                <div class="mt-3 errors" style="height: 40px;">
                    @if ($errors->has('username'))
                        <span class="text-white" role="alert">
                            {{ $errors->first('username') }}
                        </span>
                    @endif
                </div>
                
                <div class="mt-3">
                    <button type="submit" class="btn btn-primary w-100">
                        <img width="20" id="loading" src="/images/492.gif" alt="">
                        <span id="login-text">Login</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        $("input").on("keydown", function(){
            $('.errors').css('opacity', '0')
        })
    </script>
@endsection