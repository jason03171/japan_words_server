var request = require("request");
var cheerio = require("cheerio");

var jp = function(url, callback) {
  // console.log(url)
  request({
    url: url,
    method: "GET"
  }, function(error, response, body) {
    if (error || !body) {
        console.log(error)
      return;
    } else {
        var $ = cheerio.load(body);
        var target = $('span.commentItem');
        if (!target.length)  {
            console.log('No search!')
            callback(null, 'No data found');
        } else {
          let result = []
          for (let i = 0; i < target.length; i++) {
            result.push(target[i].children[0].next.next.data);
          }
          callback(null, result)
        }
    }
  });
};

module.exports = {
  jp
}

// jp();