const express = require('express');
const fs = require('fs');
const HTMLparser = require('node-html-parser');
const bodyParser = require("body-parser");
const { argv } = require('yargs')
    .option('port', {
        alias: 'p',
        describe: 'provide the port where the server will be aviable'
    })
    .option('host', {
        alias: 'h',
        describe: 'provide the host address of the server'
    })
    .default('port', 8000, '(8000)')
    .default('host', "0.0.0.0", '(this IP-address)')
    .help();
const fetch = require('node-fetch');
var HOST = argv.host,
    PORT = argv.port,
    config = "./config.json"
app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function getOriginalasJSON(url) {
    return await (fetch(url).then(res => res.json()));
}

async function getOriginalasText(url) {
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

function getOrigin() {
    try {
        obj = JSON.parse(fs.readFileSync(config, 'utf8'));
        return obj.origin;
    } catch (e) { console.error(e); throw 404; }
}

async function setOrigin(newOrigin) {
    if (!newOrigin) { return 404; }
    const jsonString = JSON.stringify({ origin: newOrigin })

    return new Promise(function (resolve, reject) {
        fs.writeFile(config, jsonString, err => {
            if (err) {
                reject(404);
            }
            else {
                resolve(200)
            }
        });
    });
}

app.post('/server', async function (req, res) {
    let status = await setOrigin(req.body.origin);
    if(status == 200){
        console.log(`New origin is set to: ${req.body.origin}`)}
    res.sendStatus(status);
})

app.get('/params', async function (req, res) {
    let URL;
    process.stdout.write("visited on: " + Date().toString() + "[");
    try {
        URL = getOrigin();
        var params = await getOriginalasJSON(URL + "/params.json")
        var html = await getOriginalasText(URL)
        res.send(processParams(params, processNames(html)));
        console.log(URL + "]")
    } catch (e) {
        res.sendStatus(404)
        console.log("failed]")
    }
});

console.log("Starting service!" + Date().toString());
console.log("Origin is set as:");
try { console.log("\t" + getOrigin()); } catch (e) { }

app.listen(PORT, function () {
    console.log(`Listening on ${HOST}:${PORT}`);
});