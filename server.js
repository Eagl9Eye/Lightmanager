const log = require("./log")("Server");

const swagger_ui = require("swagger-ui-express");
const swagger_docu = require("./swagger.json");
const express = require("express");
const fs = require("fs");
const HTMLparser = require("node-html-parser");
const bodyParser = require("body-parser");
const propertiesReader = require("properties-reader");
const { argv } = require("yargs")
    .option("port", {
        alias: "p",
        describe: "provide the port where the server will be aviable"
    })
    .option("host", {
        alias: "h",
        describe: "provide the host address of the server"
    })
    .default("port", 8000, "(8000)")
    .default("host", "0.0.0.0", "(this IP-address)")
    .help();
const fetch = require("node-fetch");
var HOST = argv.host,
    PORT = argv.port,
    config_path = "./config.properties";
app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

swagger_docu.host = HOST + ":" + PORT;

async function getOriginalasJSON(url) {
    return await fetch(url).then(res => res.json());
}

async function getOriginalasText(url) {
    return await fetch(url).then(res => res.text());
}

function processParams(params, names) {
    let res = {};
    params["marker state"]
        .split("")
        .forEach((c, i) => (res[names[i] ? names[i] : i + 1] = c));
    return res;
}

function processNames(html) {
    const root = HTMLparser.parse(html);
    var names = {};
    root
        .querySelectorAll(".mk")
        .forEach(n => (names[n.id.slice(1)] = n.innerText));
    return names;
}

function checkFile(path) {
    fs.access(path, fs.constants.F_OK | fs.constants.W_OK, err => {
        if (err) {
            fs.open(path, "w+", function(err, f) {
                log.warn("New Config created!");
                if (err) {
                    throw 404;
                }
            });
        }
    });
}

async function setProperty(name, value, reader = undefined) {
    checkFile(config_path);
    reader = reader || propertiesReader(config_path);
    reader.set(name, value);
    await reader.save(config_path);
    return value;
}

async function getProperty(name, value = "") {
    checkFile(config_path);
    var properties = propertiesReader(config_path),
        property = properties.get(name);
    if (!property) {
        return await setProperty(
            name,
            value || "change address from /server",
            properties
        );
    } else {
        return property;
    }
}

async function updateConfig(config) {
    // muss allgemeiner werden
    if (!config) {
        return 400;
    }
    return setProperty("origin", config.origin) ? 200 : 400;
}

app.post("/server", async function(req, res) {
    log.info(`Config Update: ${JSON.stringify(req.body)}`);
    let status = await updateConfig(req.body);
    res.sendStatus(status);
});

app.get("/params", async function(req, res) {
    let URL;
    process.stdout.write("visited[");
    try {
        URL = await getProperty("origin", "");
        var params = await getOriginalasJSON(URL + "/params.json");
        var html = await getOriginalasText(URL);
        res.send(processParams(params, processNames(html)));
        log.info(URL + "]");
    } catch (e) {
        res.sendStatus(404);
        log.info("failed]");
    }
});

app.use("/info", swagger_ui.serve, swagger_ui.setup(swagger_docu));

log.info("Starting service!");
getProperty("origin")
    .then(prop => log.info("Origin is set as:\t[" + prop + "]"))
    .catch(e => log.error("Failed to access the config"));

app.listen(PORT, function() {
    log.info(`Listening on ${HOST}:${PORT}`);
});