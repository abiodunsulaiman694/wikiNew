<?php

namespace App\Http\Controllers;

use App\Page;
use App\Link;
use Illuminate\Http\Request;

class PageAPIController extends Controller
{
  /**
   * Store a newly created page in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  string  $title
   * @return \Illuminate\Http\Response
   */
  function store(Request $request, $title) {
    //get all request parameters and retrieve value of first key
    $parameters = $request->all();
    $key = key($parameters);
    $value = $request->{$key};

    $page = new Page();
    $page->title = $title;
    $page->url = $this->slugger($title, '\App\Page', 'url');
    $page->body = $value;
    $page->save();

    return response()->json([
        'page' => $page,
        'message' => 'Success'
    ], 201);

  }

  /**
   * Store a newly created page in storage.
   *
   * @param  string  $turl
   * @return \Illuminate\Http\Response
   */
  function show($url) {
    $page = Page::with(['redirect', 'links'])->where('url', $url)->first();
    if (!$page) {
      return response()->json([
          'message' => 'Invalid'
      ], 200);
    } else {
      return response()->json([
          'page' => $page,
          'message' => 'Success'
      ], 200);
    }
  }
}
