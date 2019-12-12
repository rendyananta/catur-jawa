@extends('layouts.skeleton')

@section('body')
    <section class="hero is-primary is-bold is-fullheight">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    Catur Jawa
                </h1>
                <div class="columns">
                    <div class="column is-4">
                        <div class="card">
                            <header class="card-header">
                                <p class="card-header-title">
                                    Masuk
                                </p>
                            </header>
                            <div class="card-content">
                                <div class="content">
                                    <form method="post" class="form" action="{{ route('auth.login') }}">
                                        {{ csrf_field() }}
                                        <div class="field">
                                            <label class="label">Surel</label>
                                            <div class="control">
                                                <input class="input" name="email" type="email" placeholder="e.g. alexsmith@gmail.com" value="{{ old('email') }}">
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">Sandi</label>
                                            <div class="control">
                                                <input class="input" name="password" type="password" placeholder="Sandi Kamu">
                                            </div>
                                        </div>
                                        <div class="field">
                                            <button class="button is-family-secondary">
                                                Masuk
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
