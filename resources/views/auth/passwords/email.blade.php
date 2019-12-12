@extends('layouts.skeleton')
@section('body')
    <div class="hero is-link is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-4-tablet is-4-dekstop is-4-widescreen">

                        <form action="{{ route('auth.password.forgot') }}" class="box">
                            {{ csrf_field() }}
                            <div class="field has-text-centered">
                                Kamu lupa passwordmu ? isi emailmu !
                            </div>
                            <div class="field">
                                <label for="" class="label">Email</label>
                                <div class="control has-icons-left">
                                    <input type="email" name="email" id="" class="input"
                                           value="{{ old('email') }}"
                                           placeholder="e.g. rashiffaza@gmail.com" required>
                                    <span class="icon">
                                <i class="fa fa-envelope"></i>
                                </span>
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
                    </div>
                </div>

            </div>


        </div>
    </div>
@endsection
