let _ = require("lodash");

module.exports = _.pickBy({
    watch: process.env.WATCH,
    port: process.env.PORT,
    cache: process.env.CACHE,
    uglify: process.env.UGLIFY,
    localsError: process.env.LOCALS_ERROR,
    compress: process.env.COMPRESS,
    devtool: process.env.DEV_TOOL,
    mainAppName: process.env.MAIN_APP,
    dbName: process.env.DB_NAME,
    fileUploadPath: process.env.UPLOADS,
    fileUploadSize: process.env.UPLOADS_SIZE
}, function(value) {
    return !_.isUndefined(value);
});