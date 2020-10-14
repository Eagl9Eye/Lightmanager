const express = require('express');
const HTMLparser = require('node-html-parser');
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
    .default('port', 8000, '(8000)')
    .default('host', "0.0.0.0", '(this IP-address)')
    .help();
const fetch = require('node-fetch');
var HOST = argv.host,
    PORT = argv.port,
    URL = argv.origin,
    //names = argv.naming ? require(argv.naming) : {},
    app = express();

async function getOriginalasJSON(url) {
    return await (fetch(url).then(res => res.json()));
}

async function getOriginalText(url) {
    return await (fetch(url).then(res => res.text()));
}

function processParams(params, names) {
    let res = {};
    params["marker state"].split("").forEach((c, i) => res[names[i] ? names[i] : i + 1] = c)
    return res;
}

function processNames(html) {
    const root = HTMLparser.parse(html);
    var names = {};
    root.querySelectorAll('.mk').forEach(n => names[n.id.slice(1)] = n.innerText)
    return names;
}

app.get('/params', async function(req, res) {
    var params = await getOriginalasJSON(URL + "/params.json")
    var html = await getOriginalText(URL)
    res.send(processParams(params, processNames(html)));
    console.log("visited on: " + Date().toString());
});

console.log(`Origin is set as: ${URL}`);

app.listen(PORT, function() {
    console.log(`Listening on ${HOST}:${PORT}`);
});