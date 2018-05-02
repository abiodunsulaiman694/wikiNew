<?php

namespace App\Http\Controllers;

use App\Page;
use App\Link;
use Illuminate\Http\Request;

class PageAPIController extends Controller
{
  /**
   * Retrieves all pages from storage.
   *
   * @return \Illuminate\Http\Response
   */
   function index() {
     $pages = Page::with(['redirect', 'links'])->get();
       return response()->json([
           'pages' => $pages,
           'message' => 'Success'
       ], 200);
   }

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
   * Retrieves a page from storage.
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

  /**
   * Store a redirect link in storage.
   *
   * @param  string  $page_title
   * @param  string  $redirect_title
   * @return \Illuminate\Http\Response
   */
  function store_redirect($page_title, $redirect_title) {
    $decode_redirect_title = utf8_decode(urldecode($redirect_title));
    $decode_page_title = utf8_decode(urldecode($page_title));
    if (strtolower($decode_redirect_title) == strtolower($decode_page_title)) {
      return response()->json([
          'message' => 'Page should not redirect to self'
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
    if (strtolower($page->url) == strtolower($decode_redirect_title)) {
      return response()->json([
          'message' => 'Page should not redirect to self'
      ], 200);
    }

    $check_redirect = Page::where('title', $decode_redirect_title)
                  ->orWhere('url', $decode_redirect_title)
                  ->first();
    if (!$check_redirect) {
      return response()->json([
          'message' => 'Can not redirect to a non-existent page. Redirect page does not exist'
      ], 200);
    }
    $page->redirect_id = $check_redirect->id;
    $page->save();
    return response()->json([
        'redirect' => $check_redirect,
        'message' => 'Success'
    ], 200);
  }

  /**
   * Remove the specified page from storage.e.
   *
   * @param  string  $page_title
   * @return \Illuminate\Http\Response
   */
  function destroy($page_title) {
    $decode_page_title = urldecode($page_title);
    $page = Page::where('title', $decode_page_title)
                  ->orWhere('url', $decode_page_title)
                  ->first();
    if (!$page) {
      return response()->json([
          'message' => 'Page does not exist'
      ], 200);
    }
    //reset all redirects to page
    $parent_pages = Page::where('redirect_id', $page->id)
                        ->update(['redirect_id' => null]);
    //render all links to page as non existent
    $links = Link::where('link_url', $page->url)
                  ->update(['link_url' => null, 'existent' => 0]);
    //delete page
    $page->delete();
    return response()->json([
        'message' => 'Success'
    ], 200);
  }


}
