<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Catur Jawa</title>
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    @yield('style_after')
</head>
<body>
@yield('body')
<script src="{{ mix('/js/app.js') }}"></script>
@yield('scripts_after')
</body>
</html>
