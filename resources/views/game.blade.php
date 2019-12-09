@extends('layouts.skeleton')

@section('body')
    <div class="flex-center position-ref full-height">
        <canvas id="board" data-match-id="{{ $match->id }}"></canvas>
    </div>
@endsection

@section('scripts_after')
    <script src="{{ mix('/js/game.js') }}" type="text/javascript"></script>
@endsection
