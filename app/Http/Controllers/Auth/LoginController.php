<?php

namespace App\Http\Controllers\Auth;

use Adldap\Laravel\Facades\Adldap;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/eett-overview';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * @return string
     */
    public function username()
    {
        return 'username';
    }

    /**
     * @param Request $request
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->invalidate();
    }

    /**
     * @return RedirectResponse|Redirector
     */
    protected function authenticated()
    {
        return redirect('/eett-overview');
    }

    /**
     * [validateLogin description]
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    protected function validateLogin(Request $request)
    {
        $this->validate($request, [
            $this->username() => 'required|string|regex:/^\w+$/',
            'password' => 'required|string',
        ]);
    }

    /**
     * [attemptLogin description]
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    protected function attemptLogin(Request $request)
    {
        if (Adldap::auth()->attempt($request->username, $request->password)) {
            $user = Adldap::search()->users()->where('cn', '=', $request->username)->first();

            if (! $user->inGroup(['MASSUPDATE_enabled'])) {
                return false;
            }

            $user = User::where($this->username(), $request->username)->first();
            if (!$user) {
                $user = new User();
                $user->username = $request->username;
                // $user->password = $request->password;
            }

            $this->guard()->login($user, true);
            return true;
        }

        return false;
    }
}
