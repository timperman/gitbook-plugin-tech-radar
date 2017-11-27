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
  topic: Topic #Optional - will be appended to the name in the radar blip summary
  # Optional metadata hash - the keys and value will be listed in the radar blip summary
  tags:
  - one
  - two
  metadata:
    MyKey: my value
---

# Vault Secret Storage

Vault is super secret.

You should use it.
```

The quadrant and ring will be used to decide where to place the blip. The name, metadata, and the first paragraph in
the page will be used for the exandable summary area in the radar. The example above will look like:

-------------------
### Vault
**Tags**: my tag, your tag  
**MyKey**: my value

Vault is super secret

-------------------

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

### Customize the radar header and footer content

You can add your own headerImageHtml and footerHtml to override ThoughtWorks defaults
```javascript
{
    "plugins": ["tech-radar"],
    "pluginsConfig": {
        "tech-radar": {
            "footerHtml": "This is our radar. It is based on the <a href=\"https://www.thoughtworks.com/insights/blog/build-your-own-technology-radar\">enterprise tech radar article</a> by ThoughtWorks.",
            "headerImageHtml": "<img src=\"https://example.com/logo.png\" />"
        }
    }
}
```
