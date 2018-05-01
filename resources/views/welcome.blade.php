<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}"/>

        <title>{{env("APP_NAME")}}</title>
        <link rel="stylesheet" href="{{url('css/bootstrap.min.css')}}" />

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
        body {
          margin: 0;
          display: flex;
          justify-content: center;
        }
        .container {
          width: 80%;
          display: flex;
          align-items: center;
        }
        #app {
          flex: 1;
          display: flex;
          width: 100%;
        }
        </style>
    </head>
    <body>
      <div class="content" id="app">
        Loading...
      </div>
      <script src="{{url('js/app.js')}}"></script>
    </body>
</html>
