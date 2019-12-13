@extends('layouts.auth')

@section('content')
    <form action="{{ route('auth.password.reset') }}" method="post" class="box">
        {{ csrf_field() }}
        <div class="field has-text-centered">
            Atur ulang Kata Sandimu disini !
        </div>

        <div class="field">
            <label for="" class="label">Sandi</label>
            <div class="control has-icons-left">
                                    <span class="icon">
                                        <i class="fa fa-lock"></i>
                                    </span>
                <input type="password" name="password" id="" class="input" placeholder="*******"
                       required>
            </div>
        </div>
        <div class="field">
            <label for="" class="label">Konfirmasi Sandi</label>
            <div class="control has-icons-left">
                                    <span class="icon">
                                        <i class="fa fa-lock"></i>
                                    </span>
                <input type="password" name="password_confirmation" id="" class="input"
                       placeholder="*******" required>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <button class="button is-info is-fullwidth is-focused">
                    Atur ulang
                </button>
            </div>
        </div>
    </form>
@endsection
