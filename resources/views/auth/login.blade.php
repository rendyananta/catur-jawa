@extends('layouts.skeleton')

@section('body')
    <h3>Login Form</h3>
    <form action="{{ route('auth.login') }}" method="post">
        {{ csrf_field() }}
        <input type="text" name="email" value="{{ old('email') }}" placeholder="email">
        <br>
        <input type="password" name="password" value="{{ old('password') }}" placeholder="password">
        <br>
        <button type="submit">Login</button>
    </form>
@endsection
