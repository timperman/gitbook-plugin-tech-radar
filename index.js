const webpack = require('webpack')
var webpackBuild = require('./webpack.config.js')

var descRegExp = new RegExp(/<p>(.+?)<\/p>/)

let radar = {
  blips: []
}

module.exports = {
    hooks: {
      "page": function(page) {
        if ( page['tech-radar'] ) {
          var result = descRegExp.exec(page.content)
          radar.blips.push({
            name: page.title,
            description: ( result != null && result.length > 0 ) ? result[0] : '',
            ring: page['tech-radar'].ring,
            quadrant: page['tech-radar'].quadrant,
            docLink: this.output.toURL(page.path)
          })
        }
        return page
      },

      "finish": function() {
        var config = this.config.get('pluginsConfig.tech-radar', {});
        radar.name = config.title
        radar.rings = config.rings

        var bookDir = this.output.resolve(".")

        return this.output.writeFile("radar.json", JSON.stringify(radar)).then(function() {
          return webpackBuild(bookDir, config.publicPath, config.radarPath)
        })
      }
    }
};
