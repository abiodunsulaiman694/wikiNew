<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Creates a unique slug of name for the database model field.
     *
     * @param  string $name
     * @param  string  $model
     * @param  string $field
     * @return \Illuminate\Http\Response
     */
    function slugger($name, $model, $field)
    {
        $temp_slug = str_slug($name);
        $collection = $model::where($field, $temp_slug)->first();
        if(!$collection) {
            return $temp_slug;
        } else {
            $temp_slug = $temp_slug."-".time();
            return $temp_slug;
        }
    }
}
