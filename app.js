var flatiron = require('flatiron'),
    path = require('path'),
    bash = require('bash-vars'),
    curl = require('request'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http);

//  home page
app.router.get('/', function () {
  this.res.json({ 
    'hello': 'world'
  });
});

// 
app.router.get(/\/get(.*)/, function (url) {

  //console.log(url, this);
  console.log(this.req.query.url)

  var that = this,
      url = false, err = false, res = false;

  url = this.req.query.url;

  if (!url) {
    return that.res.end('Error: /get needs an url');
  }

  // get url
  curl(url, function (error, response, body) {

    if (error || (response && response.statusCode >= 400)) {
      err = error || "http error";
    };

    if (!err && body) {
      try {
        res = JSON.parse(body);
      }
      catch (e) {
        if (e) {};
        err = 'JSON: ' + e;
      }
    }

    if (err || !res) {
      return that.res.end('Error ' + err);
    } else {
      console.log(res)
      return that.res.end(bash.stringify(res) || "");
    }

  });
});

// start server
var port = app.config.get("port");
app.start(port, function () {
  app.log.info("Server started on port %s!", port);
});
