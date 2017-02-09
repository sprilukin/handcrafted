let _ = require("lodash");

module.exports = _.pickBy({
    watch: process.env.WATCH,
    port: process.env.PORT,
    cache: process.env.CACHE,
    uglify: process.env.UGLIFY,
    localsError: process.env.LOCALS_ERROR,
    compress: process.env.COMPRESS
}, function(value) {
    return !_.isUndefined(value);
});