@extends('layouts.skeleton')

@section('body')
    <section class="hero is-link is-bold is-fullheight">
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
                            <a class="navbar-item is-active" href="{{ route('game.lobby') }}">
                                Lobi
                            </a>
                            <a class="navbar-item">
                                Profil Saya
                            </a>
                            <a class="navbar-item" href="{{ route('auth.logout') }}">
                                Keluar
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <div class="hero-body" style="align-items: normal">
            <div class="container has-text-centered">
                <h1 class="title">
                    Catur Jawa
                </h1>
                <div class="columns is-centered">
                    <div class="column is-8">
                        <div class="card">
                            <header class="card-header">
                                <p class="card-header-title">
                                    Lobi
                                </p>
                                <a class="card-header-icon is-success" id="refresh">Segarkan</a>
                            </header>
                            <div class="card-content">
                                <table class="table is-hoverable is-fullwidth">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nama</th>
                                        <th>Menang</th>
                                        <th>Kalah</th>
                                        <th>Seri</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody id="table-body"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="column is-2">
                        <div class="card">
                            <div class="card-header">
                                <h2 class="card-header-title">{{ auth()->user()->name }}</h2>
                            </div>
                            <div class="card-content">
                                <figure class="image is-128x128">
                                    <img class="is-rounded is-center" src="https://bulma.io/images/placeholders/128x128.png">
                                </figure>
                                <br>
                                <h3 class="modal-card-title">Stats</h3>
                                <br>
                                <p>Menang <br><strong>{{ auth()->user()->win }}</strong></p><br>
                                <p>Kalah <br><strong>{{ auth()->user()->lose }}</strong></p><br>
                                <p>Seri <br><strong>{{ auth()->user()->draw }}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts_after')
    <script src="{{ mix('/js/lobby.js') }}" type="text/javascript"></script>
@endsection
