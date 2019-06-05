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

                <div class="text-right mt-3" style="height: 40px;">
                    @if ($errors->has('username'))
                        <span class="text-danger" role="alert">
                            <strong>{{ $errors->first('username') }}</strong>
                        </span>
                    @endif
                </div>
                
                <div class="mt-3">
                    <button type="submit" class="btn btn-primary w-100">
                        <img id="loading" src="/images/ajax-loader.gif" alt="">
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection