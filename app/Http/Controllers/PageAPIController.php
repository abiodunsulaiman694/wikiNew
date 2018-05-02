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
   * @param  string  $url
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

  /**
   * Store a newly created link in storage.
   *
   * @param  string  $page_title
   * @param  string  $link_title
   * @return \Illuminate\Http\Response
   */
  function store_link($page_title, $link_title) {
    $decode_link_title = utf8_decode(urldecode($link_title));
    $decode_page_title = utf8_decode(urldecode($page_title));
    if (strtolower($decode_link_title) == strtolower($decode_page_title)) {
      return response()->json([
          'message' => 'Page should not link to self'
      ], 200);
    }

    $page = Page::where('title', $decode_page_title)
                  ->orWhere('url', $decode_page_title)
                  ->first();
    if (!$page) {
      return response()->json([
          'message' => 'Page does not exist'
      ], 200);
    }
    if (strtolower($page->url) == strtolower($decode_link_title)) {
      return response()->json([
          'message' => 'Page should not link to self'
      ], 200);
    }

    $check_link = Page::where('title', $decode_link_title)
                  ->orWhere('url', $decode_link_title)
                  ->first();
    if ($check_link) {
      $existent = 1;
      $link_url = $check_link->url;
    } else {
      $existent = 0;
      $link_url = null;
    }

    $new_link = new Link();
    $new_link->page_id = $page->id;
    $new_link->link_title = $decode_link_title;
    $new_link->link_url = $link_url;
    $new_link->existent = $existent;
    $new_link->save();
    return response()->json([
        'link' => $new_link,
        'message' => 'Success'
    ], 200);
  }


}
