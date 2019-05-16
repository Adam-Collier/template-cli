const chalk = require("chalk");
const fs = require("fs-extra");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
let path = require("path");

async function createTemplate(workingDir, name) {
  try {
    let newDir = `${workingDir}/${name}`;
    await fs.copy(path.join(__dirname, "template"), newDir);

    let response = await fetch("https://www.missguided.co.uk/help");
    let data = await response.text();

    const $ = cheerio.load(data);

    $(".main").html('<div data-include="index"></div>');
    $("body").append('<script src="main.js"></script>');

    data = $.html();

    await fs.writeFile(`${newDir}/index.html`, data);
    console.log(
      chalk.green.bold("Your template has been created successfully \n")
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createTemplate
};
