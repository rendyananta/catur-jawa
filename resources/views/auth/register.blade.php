@extends('layouts.auth')

@section('form')
    <form action="{{ route('auth.register') }}" method="post" class="box">
        {{ csrf_field() }}
        <div class="field has-text-centered">
            <div class="content">
                <h4>Catur Jawa - Registrasi</h4>
            </div>
        </div>

        <div class="field">
            <label for="" class="label">Nama</label>
            <div class="control has-icons-left">
                <span class="icon">
                    <i class="fa fa-user"></i>
                </span>
                <input type="text" name="name" id="" class="input @error('name') is-danger @enderror" placeholder="faza Rashif" required>
            </div>
            @error('name')
            <p class="help is-danger">
                {{ $message }}
            </p>
            @enderror
        </div>

        <div class="field">
            <label for="" class="label">Surel</label>
            <div class="control has-icons-left">
                <span class="icon">
                    <i class="fa fa-envelope"></i>
                </span>
                <input type="email" name="email" id="" class="input @error('email') is-danger @enderror" placeholder="e.g. rashiffaza@gmail.com"
                       value="{{ old('email') }}" required>
                @error('email')
                <p class="help is-danger">
                    {{ $message }}
                </p>
                @enderror
            </div>
        </div>

        <div class="field">
            <label for="" class="label">Sandi</label>
            <div class="control has-icons-left">
                <span class="icon">
                    <i class="fa fa-lock"></i>
                </span>
                <input type="password" name="password" id="" class="input @error('password') is-danger @enderror" placeholder="*******" required>
                @error('password')
                <p class="help is-danger">
                    {{ $message }}
                </p>
                @enderror
            </div>

        </div>
        <div class="field">
            <label for="" class="label">Konfirmasi Sandi</label>
            <div class="control has-icons-left">
                <span class="icon">
                    <i class="fa fa-lock"></i>
                </span>
                <input type="password" name="password_confirmation" id="" class="input @error('password_confirmation') is-danger @enderror" placeholder="*******"
                       required>
                @error('password_confirmation')
                <p class="help is-danger">
                    {{ $message }}
                </p>
                @enderror
            </div>

        </div>
        <div class="field">
            <div class="control">
                <button class="button is-info is-fullwidth">
                    Registrasi
                </button>
            </div>
        </div>
    </form>
@endsection
