@extends('layouts.auth')

@section('form')
    <form action="{{ route('auth.password.forgot') }}" class="box">
        {{ csrf_field() }}
        <div class="field has-text-centered">
            Kamu lupa passwordmu ? Isi dengan surel yang terdaftar !
        </div>
        <div class="field">
            <label for="" class="label">Surel</label>
            <div class="control has-icons-left">
                                    <span class="icon">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                <input type="email" name="email" id="" class="input"
                       value="{{ old('email') }}"
                       placeholder="e.g. rashiffaza@gmail.com" required>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-info is-fullwidth is-focused">
                    Kirim
                </button>
            </div>
        </div>
    </form>
@endsection
