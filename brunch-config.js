exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: {
        "js/app.js": /^(web\/static\/js)/,
        "js/vendor.js": /^(node_modules)/
      },
      order: {
        before: [/process/, /reflect-metadata/],
        after: [/\.html$/, /\.css$/]
      }

      // To use a separate vendor.js bundle, specify two files path
      // http://brunch.io/docs/config#-files-
      // joinTo: {
      //  "js/app.js": /^(web\/static\/js)/,
      //  "js/vendor.js": /^(web\/static\/vendor)|(deps)/
      // }
      //
      // To change the order of concatenation of files, explicitly mention here
      // order: {
      //   before: [
      //     "web/static/vendor/js/jquery-2.1.1.js",
      //     "web/static/vendor/js/bootstrap.min.js"
      //   ]
      // }
    },
    stylesheets: {
      joinTo: {
        "css/app.css": 'web/static/css/app.scss'
      },
      order: {
        after: ["web/static/css/app.css"] // concat app.css last
      }
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/web/static/assets". Files in this directory
    // will be copied to `paths.public`, which is "priv/static" by default.
    assets: /^(web\/static\/assets)/
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: [
      "web/static",
      "test/static"
    ],

    // Where to compile files to
    public: "priv/static"
  },

  // Configure your plugins
  plugins: {
    inlineCss: {
      html: true,
      passthrough: [/^node_modules/, 'web/static/css/app.scss']
    },

    sass: {
      precision: 8,
      allowCache: true,
      sourceMapEmbed: true,
      options: {
        includePaths: [
          'node_modules/materialize-css/sass/',
          'node_modules/mdi/scss'
        ]
      }
    },

    brunchTypescript: {
    },

    copycat: {
      "fonts": [
        'node_modules/materialize-css/fonts/',
        'node_modules/mdi/fonts'
      ]
    }
  },

  modules: {
    autoRequire: {
      "js/app.js": ["web/static/js/app"]
    }
  },

  npm: {
    enabled: true
  }
};
