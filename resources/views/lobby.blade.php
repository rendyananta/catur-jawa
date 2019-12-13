@extends('layouts.dashboard')

@section('content')
    <h1 class="title has-text-centered">
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
                        <img class="is-rounded is-center" src="{{ auth()->user()->avatar_url }}">
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
@endsection

@section('scripts_after')
    <script src="{{ mix('/js/lobby.js') }}" type="text/javascript"></script>
@endsection
