const chalk = require("chalk");
const fs = require("fs-extra");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const ora = require("ora");

let path = require("path");

const { spawn } = require("child_process");

let createTemplate = (workingDir, name) => {
  let newDir = `${workingDir}/${name}`;
  fs.copy(path.join(__dirname, "template"), newDir)
    .then(() => {
      fetch("https://www.missguided.co.uk/")
        .then(response => response.text())
        .then(data => {
          const $ = cheerio.load(data);
          $(".main").html('<div data-include="index"></div>');
          $("body").append('<script src="main.js"></script>');
          data = $.html();

          return new Promise(function(resolve, reject) {
            fs.writeFile(`${newDir}/index.html`, data, err => {
              if (err) console.log(err);
              console.log(
                chalk.green.bold(
                  "Your template has been created successfully\n"
                )
              );
              resolve();
            });
          })
            .then(() => {
              process.chdir(newDir);
              const spinner = ora("Installing depencies\n").start();
              spawn("npm", ["install"]);
              spinner.succeed("Dependencies have been installed\n");
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.error(err));
};

module.exports = {
  createTemplate
};
