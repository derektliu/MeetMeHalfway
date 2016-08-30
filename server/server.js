var app = require('./config/server-config.js');

var port = 1337;

app.listen(port, function() {
  console.log('Server listening on port 1337');
});

