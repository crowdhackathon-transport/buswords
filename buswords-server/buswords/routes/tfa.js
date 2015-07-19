var express = require('express');
var FeedParser = require('feedparser');
var request = require('request');
var htmlToText = require('html-to-text');

var router = express.Router();

var req = request('http://oasa.gr/news/el/anaknews.xml'),
    feedparser = new FeedParser();

req.on('error', function (error) {
  // handle any request errors
});

req.on('response', function (res) {
  var stream = this;

  if (res.statusCode != 200) {
      return this.emit('error', new Error('Bad status code'));
  }

  stream.pipe(feedparser);
});


feedparser.on('error', function(error) {
  // always handle errors
});


var feed_items = [];

feedparser.on('readable', function() {
  // This is where the action is!
  var stream = this
    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
    , item;

  while (item = stream.read()) {
    if (feed_items.length >= 10) {
        return;
    }

    feed_items.push({
        title: item.title,
        link: item.link
    });
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(feed_items);
});


module.exports = router;
