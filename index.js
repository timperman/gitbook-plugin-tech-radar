const webpack = require('webpack')
var webpackBuild = require('./webpack.config.js')

var descRegExp = new RegExp(/<p>((?:.|\n)+?)<\/p>/)

let radar = {
  blips: [],
  tags: {}
}

function isBlipNew(page) {
  const ring = page['tech-radar'].ring
  const prevRing = page['tech-radar'].previousRing || ''

  if (ring === prevRing) {
    return "false"
  }

  return "true"
}

module.exports = {
    hooks: {
      "page": function(page) {
        if ( page['tech-radar'] ) {
          var result = descRegExp.exec(page.content)
          const blip = {
            name: page['tech-radar'].name || page.title,
            description: ( result != null && result.length > 0 ) ? result[1] : '',
            ring: page['tech-radar'].ring,
            metadata: page['tech-radar'].metadata && JSON.stringify(page['tech-radar'].metadata),
            topic: page['tech-radar'].topic,
            quadrant: page['tech-radar'].quadrant,
            docLink: this.output.toURL(page.path),
            isNew: isBlipNew(page),
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
        radar.footerHtml = config.footerHtml
        radar.headerImageHtml = config.headerImageHtml

        var bookDir = this.output.resolve(".")

        return this.output.writeFile("radar.json", JSON.stringify(radar)).then(function() {
          return webpackBuild(bookDir, config.publicPath, config.radarPath)
        })
      }
    }
};
