@extends('layouts.skeleton')

@section('body')
    <h3>Register Form</h3>
    <form action="{{ route('auth.register') }}" method="post">
        {{ csrf_field() }}
        <input type="text" name="name" value="{{ old('name') }}" placeholder="name">
        <br>
        <input type="text" name="email" value="{{ old('email') }}" placeholder="email">
        <br>
        <input type="password" name="password" value="{{ old('password') }}" placeholder="password">
        <br>
        <input type="password" name="password_confirmation" value="{{ old('password') }}" placeholder="password confirmation">
        <br>
        <button type="submit">Register</button>
    </form>
@endsection
