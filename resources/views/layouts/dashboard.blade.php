@extends('layouts.default')

@section('body_attributes')
    style="align-items: normal"
@endsection

@section('hero_head')
    <div class="hero-head">
        <nav class="navbar">
            <div class="container">
                <div class="navbar-brand">
                        <span class="navbar-burger burger" data-target="navbarMenuHeroA">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                </div>
                <div id="navbarMenuHeroA" class="navbar-menu">
                    <div class="navbar-end">
                        <a class="navbar-item {{ request()->route()->getName() == 'game.lobby' ? 'is-active' : '' }}" href="{{ route('game.lobby') }}">
                            Lobi
                        </a>
                        <a class="navbar-item {{ request()->route()->getName() == 'profile.edit' ? 'is-active' : '' }}" href="{{ route('profile.edit') }}">
                            Edit Profil
                        </a>
                        <a class="navbar-item" href="{{ route('auth.logout') }}">
                            Keluar
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
@endsection
