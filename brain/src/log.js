module.exports = function(name) {
    return {
        info: function(msg) { print("INFO", name, msg); },
        warn: function(msg) { print("WARN", name, msg); },
        error: function(msg) { print("ERROR", name, msg); }
    };
}

function print(severity, name, msg) {
    let time = new Date().toLocaleString();
    console.log(time + " [" + name + "][" + severity + "]: " + msg);
}