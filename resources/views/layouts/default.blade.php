@extends('layouts.skeleton')

@section('body')
    <div class="hero is-link is-bold is-fullheight">
        @yield('hero_head')
        <div class="hero-body" @yield('body_attributes')>
            <div class="container">
                @yield('content')
            </div>
        </div>
    </div>
@endsection
