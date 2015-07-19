var express = require('express');
var router = express.Router();
var fs = require('fs');
var Twitter = require('twitter');

var twitter_credentials = '';
var twitter_client;

fs.readFile('creds.json', function (err, data) {
    if (!err) {
        twitter_credentials = JSON.parse(data);
        twitter_client = Twitter(twitter_credentials);
    } else {
        throw new Error('Isht happened.');
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  twitter_client.get('/trends/place', {id: 946738}, function (err, tweets, response) {
      var trends = JSON.parse(response.body)[0].trends,
          trend_names = trends.map(function (trend) {
              return (trend.name.match(/^#/)) ? trend.name : ('#' + trend.name);
          });
      res.set('Access-Control-Allow-Origin', '*');
      res.json(trend_names);
  });
});

module.exports = router;
