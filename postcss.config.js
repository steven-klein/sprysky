var POSTCSS = {
    "input": "resources/assets/css/app.css",
    "output": "docs/assets/css/app.css",
    "use": [
        "postcss-import",
        "postcss-cssnext",
        "postcss-browser-reporter",
        "postcss-reporter"
    ],
    "cssnano": {
        safe: true,
        autoprefixer: false //handled by postcss-cssnext
    },
    "local-plugins": true,
    "map": "file"
}

if(process.env.NODE_ENV === "production"){
    POSTCSS.use.push('cssnano'); // add cssnano in production
    POSTCSS.map = false; //sourcemaps to external file
}

module.exports = POSTCSS;
