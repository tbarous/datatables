<?php

namespace App\Http\Controllers\Auth;

use Adldap\Auth\BindException;
use Adldap\Auth\PasswordRequiredException;
use Adldap\Auth\UsernameRequiredException;
use Adldap\Laravel\Facades\Adldap;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use ReflectionException;

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
     * @param Request $request
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->invalidate();
    }

    protected function authenticated()
    {
        return redirect('/eett-overview');
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
     * @throws ValidationException
     */
    protected function validateLogin(Request $request)
    {
        $this->validate($request, [
            $this->username() => 'required|string|regex:/^\w+$/',
            'password' => 'required|string',
        ]);
    }

    /**
     * @param Request $request
     * @return bool
     * @throws BindException
     * @throws PasswordRequiredException
     * @throws UsernameRequiredException
     */
    protected function attemptLogin(Request $request)
    {
        $user_format = env('LDAP_USER_FORMAT', 'cn=%s,' . env('LDAP_BASE_DN', ''));
        $userdn = sprintf($user_format, $request->username);
        // Adldap::auth()->bind($userdn, $password);

        if (Adldap::auth()->attempt($userdn, $request->password, $bindAsUser = true)) {
            $user = User::where($this->username(), $username)->first();
            if (!$user) {
                $user = new User();
                $user->username = $username;
                $user->password = '';
            }

            $this->guard()->login($user, true);
            return true;
        }
        return false;
    }
}
