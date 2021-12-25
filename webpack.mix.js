const mix = require('laravel-mix');

require('laravel-mix-polyfill');
mix.sass('resources/scss/site.scss', 'web/resources/css/site.min.css');

mix.js('resources/js/site.js', 'web/resources/js/site.min.js').polyfill({
    enabled: true,
    useBuiltIns: "usage",
    targets: "firefox 50, IE 11"
});