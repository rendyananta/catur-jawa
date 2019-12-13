@extends('layouts.dashboard')

@section('content')
    <div class="container">
        <div class="columns">
            <div class="column is-10">
                <canvas id="board" data-match-id="{{ $match->id }}"></canvas>
            </div>
            <div class="column">
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <span class="tag is-success is-normal" id="turn">Giliranmu</span>
                        <br>
                        <span class="tag is-danger is-normal" id="not-turn">Menunggu giliran &nbsp;<strong>{{ $against->name }}</strong></span>
                    </div>
                    <div class="column is-12">
                        <div class="card">
                            <div class="card-header">
                                <h2 class="card-header-title">{{ $against->name }}</h2>
                            </div>
                            <div class="card-content">
                                <figure class="image is-128x128">
                                    <img class="is-rounded" src="{{ $against->avatar_url }}">
                                </figure>
                                <br>
                                <h3 class="modal-card-title">Stats</h3>
                                <br>
                                <p>Menang <br><strong>{{ $against->win }}</strong></p><br>
                                <p>Kalah <br><strong>{{ $against->lose }}</strong></p><br>
                                <p>Seri <br><strong>{{ $against->draw }}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts_after')
    <script src="{{ mix('/js/game.js') }}" type="text/javascript"></script>
@endsection
