@extends('layouts.skeleton')

@section('body')
    <div class="flex-center position-ref full-height">
        Lobby
    </div>
@endsection

@section('scripts_after')
    <script src="{{ mix('/js/lobby.js') }}" type="text/javascript"></script>
@endsection
