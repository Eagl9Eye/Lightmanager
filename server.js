const express = require('express');
const { argv } = require('yargs')
.option('port', {
  alias: 'p',
  describe: 'provide the port where the server will be aviable'
})
.option('host', {
  alias: 'h',
  describe: 'provide the host address of the server'
})
.option('origin', {
  alias: 'o',
  type: 'string',
  describe: 'specify the origin of the manipulated json-file',
  demandOption: true
})
.option('naming', {
  alias: 'n',
  describe: 'specify naming rules for the manipulated json-file'
})
.default('port', 8000, '(8000)')
.default('host', "0.0.0.0", '(this IP-address)')
.help();
const fetch = require('node-fetch');
var HOST = argv.host,
PORT = argv.port,
URL = argv.origin, 
names = argv.naming?require(argv.naming) : {},
app = express();

async function getOriginal(url) {
  return await(fetch(url).then(res => res.json()));
}

function processParams(params){
  let res = {};
  params["marker state"].split("").forEach((c,i) => res[names[i+1]?names[i+1]:i+1] = c)
  return res;
}

app.get('/params', async function (req, res) {
  var params = await getOriginal(URL)
  res.send(processParams(params));
  console.log("visited on: " + Date().toString());
});

console.log(`Origin is set as: ${URL}`);

app.listen(PORT, function () {
  console.log(`Listening on ${HOST}:${PORT}`);
});
