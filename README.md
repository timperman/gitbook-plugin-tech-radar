A gitbook plugin that generates an interactive radar, inspired by [thoughtworks.com/radar](http://thoughtworks.com/radar) and forked from [github.com/thoughtworks/build-your-own-radar](https://github.com/thoughtworks/build-your-own-radar)

## How To Use

Add the `tech-radar` plugin to your `book.json`. By default, your tech radar will be generated at `radar.html` in your book.

```javascript
{
    "plugins": ["tech-radar"],
    "pluginsConfig": {
        "tech-radar": {
            "title": "Tech Radar",
            "publicPath": "/",
            "radarPath": "radar.html"
        }
    }
}
```

The interactive radar will include links to the Gitbook pages. It can be used as the book's homepage by specifying `"radarPath": "index.html"`, replacing the `README.md` of the book.

Specify `publicPath` if the site will be deployed under a context path (for example, if the site is deployed to `http://example.io/tech-radar`, set `"publicPath": "/tech-radar"`) so that the Webpack build can generate links correctly.

### Setting up your data

This plugin will examine a page's front matter to determine if it should be added as an item on the interactive radar. This example front matter will add an item to the "trial" ring:

```
---
tech-radar:
  name: Vault
  quadrant: Tools
  ring: trial
---

# Vault Secret Storage
```

**NOTE:** There will be an error message on the generated radar if there are less than four quadrants represented in the pages' markdown files.

### Change default rings

Specify an `{ "name": "index", ... }` format map of rings like so:

```javascript
{
    "plugins": ["tech-radar"],
    "pluginsConfig": {
        "tech-radar": {
            "rings": { "first": "0", "second": "1", "third": "2", "fourth": "3" }
        }
    }
}
```

The ring names in page front matter must match ring names in the plugin config.
