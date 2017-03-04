var fs = require("fs"),
    path = require("path"),
    url = require("url");

var dir = path.resolve(__dirname + "/httpdocs");

module.exports = {
    "notify": true,
    server: {
        baseDir: "./httpdocs"
    },
    "files": [
        "httpdocs/**/*.+(html|css|js)"
    ],
    middleware: [ //emulate the default rules in .htaccess where example.com/page = example.com/page.html
        function (req, res, next) {
            var fileName = url.parse(req.url);
            fileName = fileName.href.split(fileName.search).join("");
            var fileExists = fs.existsSync(dir + fileName);

            if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {

                fileExists = fs.existsSync(dir + fileName + ".html");
                if(fileExists)
                    req.url = fileName + ".html";
            }
            return next();
        }
    ]
};
