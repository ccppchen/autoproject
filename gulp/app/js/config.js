//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
require.config({
    baseUrl: 'js',
    paths: {
        vendor: ['vendor/vendor.min'],
        touchslider: ['touchslider']
    },
    shim: {
        "bl-scroll-load": ["vendor"],
        "fx_methods": ["vendor"]
    }
});

require(['comm']);

