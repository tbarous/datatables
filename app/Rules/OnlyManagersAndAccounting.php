<?php

namespace App\Rules;

use Adldap\Laravel\Validation\Rules\Rule;

class OnlyManagersAndAccounting extends Rule
{
    /**
     * Determines if the user is allowed to authenticate.
     *
     * @return bool
     */
    public function isValid()
    {
        // $ous = [
        //     'ou=Accounting,dc=acme,dc=org',
        //     'ou=Managers,dc=acme,dc=org',
        // ];

        // return str_contains($this->user->getDn(), $ous);

        return $this->user->inGroup('Accounting');
    }
}
