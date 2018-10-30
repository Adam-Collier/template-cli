const chalk = require("chalk");
const fs = require("fs-extra");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
let path = require("path");

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
          fs.writeFile(`${newDir}/index.html`, data, err => {
            if (err) console.log(err);
            console.log(
              chalk.gray.bgGreen.bold(
                "Your template has been created successfully"
              )
            );
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.error(err));
};
module.exports = {
  createTemplate
};
