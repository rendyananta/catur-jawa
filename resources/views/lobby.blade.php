@extends('layouts.skeleton')

@section('body')
    <section class="hero is-dark is-bold is-fullheight">
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
                            </header>
                            <div class="card-content">
                                <button class="button is-success" id="refresh">Segarkan</button>
                                <table class="table is-hoverable is-fullwidth">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nama</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody id="table-body"></tbody>
                                </table>
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
