require.config({
    baseUrl: 'js',
    paths: {
        vendor: ['vendor/vendor.min'],
        touchslider: ['touchslider']
    },
    shim: {
        "bl-scroll-load": ["vendor"],
        "fx_methods": ["vendor"],
        "picker": ["vendor"]
    }
});

