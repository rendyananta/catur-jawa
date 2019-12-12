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
                                    Registrasi
                                </p>
                            </header>
                            <div class="card-content">
                                <div class="content">
                                    <form method="post" class="form" action="{{ route('auth.register') }}">
                                        {{ csrf_field() }}
                                        <div class="field">
                                            <label class="label">Nama</label>
                                            <div class="control">
                                                <input class="input" name="name" type="email" placeholder="Nama kamu" value="{{ old('name') }}">
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">Surel</label>
                                            <div class="control">
                                                <input class="input" name="email" type="email" placeholder="Contoh: alexsmith@gmail.com" value="{{ old('email') }}">
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">Sandi</label>
                                            <div class="control">
                                                <input class="input" type="password" name="password" placeholder="Sandi Kamu">
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">Konfirmasi Sandi</label>
                                            <div class="control">
                                                <input class="input" type="password" name="password_confirmation" placeholder="Konfirmasi Sandi Kamu">
                                            </div>
                                        </div>
                                        <div class="field">
                                            <button class="button is-family-secondary">
                                                Registrasi
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
