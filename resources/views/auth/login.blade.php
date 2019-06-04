@extends('layouts.auth')
@section('content')
    @include('auth.navbar')
    <div class="container">
        <div class="row justify-content-center">

            <div class="col-md-6">
                <div>
                    <div style="font-size:30px;" class="text-center text-white">
                        VICTUS
                    </div>

                    <div class="mt-5">
                        <form method="POST" action="{{ route('login') }}">
                            @csrf

                            <div class="form-group row justify-content-center">
                                <label for="username" class="col-sm-12 offset-sm-6 text-white col-form-label">Username</label>
                                <div class="col-md-6">
                                    <input id="username" type="text" class="form-control" name="username" value="{{ old('username') }}" required autofocus>
                                </div>
                            </div>

                            <div class="form-group row justify-content-center">
                                <label for="password" class="col-md-12 offset-sm-6 text-white col-form-label">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" name="password" required autocomplete="current-password">
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-3">
                                    @if ($errors->has('username'))
                                        <span class="text-danger" role="alert">
                                            <strong>{{ $errors->first('username') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row mb-0 mt-4 justify-content-center">
                                <div class="col-md-6">
                                    <button type="submit" class="btn btn-primary w-100">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection