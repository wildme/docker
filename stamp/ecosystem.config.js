module.exports = {
  apps: [{
    name: "stamp",
    script: "./app.js",
    instances: 1,
    error_file: "./logs/error.log",
    out_file: "./logs/out.log"
  }]
}

