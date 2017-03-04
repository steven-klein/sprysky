var package = require('./../../package.json');

module.exports = {
    "_comment": "Application data made available to handlebars.",
    "name": "bs.dev",
    "description": "Flat HTML Handlerbars site.",
    "version": package.version || "",
    "environment": process.env.NODE_ENV || "development",
    "production": (process.env.NODE_ENV === "production")
}
