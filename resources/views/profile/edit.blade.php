@extends('layouts.dashboard')
@section('content')
    <div class="columns is-centered">
        <div class="column is-4-tablet is-4-dekstop is-4-widescreen">

            <form action="{{ route('profile.update') }}" method="post" class="box" enctype="multipart/form-data">
                {{ csrf_field() }}
                {{ method_field('put') }}
                <div class="field has-text-centered">
                    <h2 class="card-header-title">Profil Kamu</h2>
                </div>
                <div class="field">
                    <figure class="image is-128x128">
                        <img class="is-rounded" src="{{ request()->user()->avatar_url }}">
                    </figure>
                </div>

                <div class="field">
                    <label for="" class="label">Nama</label>
                    <div class="control has-icons-left">
                        <span class="icon">
                            <i class="fa fa-lock"></i>
                        </span>
                        <input type="text" name="name" id="" value="{{ auth()->user()->name }}" class="input @error('name') is-danger @enderror" placeholder="Nama Lengkap" required>
                        @error('name')
                        <p class="help is-danger">
                            {{ $message }}
                        </p>
                        @enderror
                    </div>

                </div>
                <div class="field">
                    <label for="" class="label">Surel</label>
                    <div class="control has-icons-left">
                        <span class="icon">
                            <i class="fa fa-lock"></i>
                        </span>
                        <input type="text" name="email" id="" value="{{ auth()->user()->email }}" class="input @error('email') is-danger @enderror" placeholder="caturjawa@gmail.com" required>
                        @error('email')
                        <p class="help is-danger">
                            {{ $message }}
                        </p>
                        @enderror
                    </div>

                </div>
                <div class="field">
                    <label for="" class="label">Sandi (isi untuk merubah sandi)</label>
                    <div class="control has-icons-left">
                        <span class="icon">
                            <i class="fa fa-lock"></i>
                        </span>
                        <input type="password" name="password" id="" class="input @error('password') is-danger @enderror" placeholder="*****">
                        @error('password')
                        <p class="help is-danger">
                            {{ $message }}
                        </p>
                        @enderror
                    </div>
                </div>
                <div class="field">
                    <label for="" class="label">Konfirmasi Sandi (isi untuk merubah sandi)</label>
                    <div class="control has-icons-left">
                        <span class="icon">
                            <i class="fa fa-lock"></i>
                        </span>
                        <input type="password" name="password_confirmation" id="" class="input @error('password_confirmation') is-danger @enderror" placeholder="*****">
                        @error('password_confirmation')
                        <p class="help is-danger">
                            {{ $message }}
                        </p>
                        @enderror
                    </div>
                </div>
                <div class="field">
                    <label for="" class="label">Avatar (Upload untuk mengganti avatar)</label>
                    <div class="control has-icons-left">
                        <div class="file">
                            <label class="file-label">
                                <input class="file-input" type="file" name="avatar">
                                <span class="file-cta">
                                  <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                  </span>
                                  <span class="file-label">
                                    Pilih berkas
                                  </span>
                                </span>
                            </label>
                        </div>
                        @error('avatar')
                        <p class="help is-danger">
                            {{ $message }}
                        </p>
                        @enderror
                    </div>
                </div>
                <div class="field">
                    <button type="submit" class="button is-warning">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection
