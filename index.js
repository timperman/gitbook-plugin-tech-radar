const webpack = require('webpack')
var webpackBuild = require('./webpack.config.js')

var descRegExp = new RegExp(/<p>(.+?)<\/p>/)

let radar = {
  blips: [],
  tags: {}
}

module.exports = {
    hooks: {
      "page": function(page) {
        if ( page['tech-radar'] ) {
          var result = descRegExp.exec(page.content)
          const blip = {
            name: page.title,
            description: (result != null && result.length > 0) ? result[0] : '',
            ring: page['tech-radar'].ring,
            quadrant: page['tech-radar'].quadrant,
            docLink: this.output.toURL(page.path),
            tags: page['tech-radar'].tags
          };

          radar.blips.push(blip)

          if (blip.tags) {
            radar.tags = blip.tags.reduce((allTags, tag) => {
              if (!allTags[tag]) {
                allTags[tag] = []
              }
              allTags[tag].push(blip.docLink)

              return allTags
            }, radar.tags)
          }
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
