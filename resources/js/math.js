function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function lerpUnclamped(a, b, t) {
    return (1 - t) * a + t * b;
}

// EASING EQUATION http://gizma.com/easing/

function easeInQuad(a, b, t) {
    return (b - a) * t * t + a;
}

function easeOutQuad(a, b, t) {
    return (a - b) * t * (t - 2) + a;
}

function easeInOutQuad(a, b, t) {
    t *= 2;
    if (t < 1) return (b - a) * 0.5 * t * t + a;
    t--;
    return (a - b) * 0.5 * (t * (t - 2) - 1) + a;
}
