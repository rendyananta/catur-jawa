@extends('layouts.skeleton')

@section('body')
    <div class="hero is-link is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-4-tablet is-4-dekstop is-4-widescreen">

                        <form action="{{ route('auth.register') }}" method="post" class="box">
                            {{ csrf_field() }}
                            <div class="field has-text-centered">
                                Catur Jawa
                            </div>

                            <div class="field">
                                <label for="" class="label">Nama</label>
                                <div class="control has-icons-left">
                                    <input type="text" name="name" id="" class="input" placeholder="faza Rashif" required>
                                    <span class="icon">
                                    <i class="fa fa-user"></i>
                                    </span>
                                </div>

                            </div>

                            <div class="field">
                                <label for="" class="label">Surel</label>
                                <div class="control has-icons-left">
                                    <input type="email" name="email" id="" class="input" placeholder="e.g. rashiffaza@gmail.com" value="{{ old('email') }}" required>
                                    <span class="icon">
                                <i class="fa fa-envelope"></i>
                                </span>
                                </div>
                            </div>

                            <div class="field">
                                <label for="" class="label">Sandi</label>
                                <div class="control has-icons-left">
                                    <input type="password" name="password" id="" class="input" placeholder="*******" required>
                                    <span class="icon">
                                            <i class="fa fa-lock"></i>
                                            </span>
                                </div>

                            </div>
                            <div class="field">
                                <label for="" class="label">Konfirmasi Sandi</label>
                                <div class="control has-icons-left">
                                    <input type="password" name="password_confirmation" id="" class="input" placeholder="*******" required>
                                    <span class="icon">
                                                <i class="fa fa-lock"></i>
                                                </span>
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
                    </div>
                </div>

            </div>


        </div>
    </div>
@endsection
