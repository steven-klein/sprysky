var handlebarsConfig = {
    src: [
        'resources/templates/pages/**/*.hbs'
    ],
    fileExtension: '.html',
    dest: 'docs',
    ignorePartials: false,
    batch: ['resources/templates/partials'],
    watch: [
        'resources/templates/**/*.+(php|html|md|hbs|json)',
        'resources/data/**/*.+(js|json)'
    ],
    ignoreProduction: [],
    minifyOptions: {
        collapseWhitespace: true,
        removeComments: true
    },
    helpers: {
        entities: function(str) {
            var map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };

            return str.replace(/[&<>"']/g, function(m) { return map[m]; });
        }
    }
};

module.exports = handlebarsConfig;
