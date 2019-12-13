@extends('layouts.auth')

@section('form')
    <form action="{{ route('auth.login') }}" method="post" class="box">
        {{ csrf_field() }}
        <div class="field has-text-centered">
            <div class="content">
                <h4>Catur Jawa - Masuk</h4>
            </div>
        </div>

        <div class="field">
            <label for="" class="label">Surel</label>
            <div class="control has-icons-left">
                                    <span class="icon">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                <input type="email" name="email" id="" class="input"
                       placeholder="e.g. rashiffaza@gmail.com" value="{{ old('email') }}" required>
            </div>
        </div>

        <div class="field">
            <label for="" class="label">Sandi</label>
            <div class="control has-icons-left">
                                    <span class="icon">
                                            <i class="fa fa-lock"></i>
                                    </span>
                <input type="password" name="password" id="" class="input" placeholder="*******" required>
            </div>
        </div>

        <div class="field">
            <label for="" class="label">
                <div class="control">
                    <input type="checkbox" name="remember_me" id="">
                    Ingat Saya
                </div>
            </label>
        </div>

        <div class="field">
            <a href="{{ route('auth.password.forgot.form') }}">Lupa Sandi ?</a>
        </div>

        <div class="field">
            <a href="{{ route('auth.register') }}">Belum punya akun ? Daftar disini</a>
        </div>

        <div class="field">
            <div class="control">
                <button class="button is-info is-fullwidth">
                    Masuk
                </button>
            </div>
        </div>
    </form>
@endsection
