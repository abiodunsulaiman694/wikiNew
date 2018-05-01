<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Link extends Model
{
  use SoftDeletes;

  function page() {
    return $this->belongsTo(Page::class, 'page_id');
  }
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'link_title', 'link_url', 'exiistent'
  ];
}
