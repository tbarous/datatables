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
        $credentials = $request->only($this->username(), 'password');
        $username = $credentials[$this->username()];
        $password = $credentials['password'];

        $user_format = env('LDAP_USER_FORMAT', 'cn=%s,' . env('LDAP_BASE_DN', ''));
        $userdn = sprintf($user_format, $username);
//        dd($userdn);

        // Adldap::auth()->bind($userdn, $password);
        if (Adldap::auth()->attempt($userdn, $password, $bindAsUser=true)) {
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

    /**
     * @param $username
     * @return array|bool
     * @throws ReflectionException
     */
    protected function retrieveSyncAttributes($username)
    {
        $ldapuser = Adldap::search()->where(env('LDAP_USER_ATTRIBUTE'), '=', $username)->first();
        if (!$ldapuser) {
            return false;
        }

        $ldapuser_attrs = null;

        $attrs = [];

        foreach (config('ldap_auth.sync_attributes') as $local_attr => $ldap_attr) {
            if ($local_attr == 'username') {
                continue;
            }

            $method = 'get' . $ldap_attr;
            if (method_exists($ldapuser, $method)) {
                $attrs[$local_attr] = $ldapuser->$method();
                continue;
            }

            if ($ldapuser_attrs === null) {
                $ldapuser_attrs = self::accessProtected($ldapuser, 'attributes');
            }

            if (!isset($ldapuser_attrs[$ldap_attr])) {
                $attrs[$local_attr] = null;
                continue;
            }

            if (!is_array($ldapuser_attrs[$ldap_attr])) {
                $attrs[$local_attr] = $ldapuser_attrs[$ldap_attr];
            }

            if (count($ldapuser_attrs[$ldap_attr]) == 0) {
                $attrs[$local_attr] = null;
                continue;
            }

            $attrs[$local_attr] = $ldapuser_attrs[$ldap_attr][0];
        }

        return $attrs;
    }

    /**
     * @param $obj
     * @param $prop
     * @return mixed
     * @throws ReflectionException
     */
    protected static function accessProtected($obj, $prop)
    {
        $reflection = new \ReflectionClass($obj);
        $property = $reflection->getProperty($prop);
        $property->setAccessible(true);
        return $property->getValue($obj);
    }
}
