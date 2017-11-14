const Blip = function (name, ring, isNew, topic, description, docLink, tags) {
  var self, number;

  self = {};
  number = -1;

  self.name = function () {
    return name;
  };

  self.topic = function () {
    return topic || '';
  };

  self.description = function () {
    return description || '';
  };

  self.tags = function() {
    if (tags) {
      return Object.values(tags)
    }

    return [];
  }

  self.hasTag = function(tag) {
    if (window.tag) {
      if (tags) {
        return Object.values(tags).includes(tag)
      }
      return false
    }

    return true
  }

  self.docLink = function () {
    return docLink || '';
  };

  self.isNew = function () {
    return isNew;
  };

  self.ring = function () {
    return ring;
  };

  self.number = function () {
    return number;
  };

  self.setNumber = function (newNumber) {
    number = newNumber;
  };

  return self;
};

module.exports = Blip;
