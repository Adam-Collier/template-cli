const fs = require("fs-extra");
const chalk = require("chalk");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { promisify } = require("util");

const writeFile = promisify(fs.writeFile);

async function updateTemplate(workingDir) {
  await fs.readdir(workingDir, async function(err, items) {
    if (err) console.log(err);
    let success = ["views", "package.json", "main.js", "index.html"].every(
      val => items.includes(val)
    );
    if (success) {
      let response = await fetch("https://www.missguided.co.uk/help");
      let data = await response.text();

      const $ = cheerio.load(data);

      $(".main").html('<div data-include="index"></div>');
      $("body").append('<script src="main.js"></script>');

      data = $.html();

      await fs.writeFile(`index.html`, data);
      console.log(
        chalk.gray.bgGreen.bold(
          "Your template has been created successfully \n"
        )
      );

      let directories = await fs.readdir(`${workingDir}/views`);

      if (directories.includes("your-html.html")) {
        fs.rename(
          `${workingDir}/views/your-html.html`,
          `${workingDir}/views/index.html`
        );
        console.log(chalk.gray.bgGreen.bold("your views were updated"));
      } else {
        console.log(chalk.white.bgRed.bold("view already correctly named"));
      }
    } else {
      console.log(chalk.white.bgRed.bold("this isn't a template directory"));
    }
  });
}

module.exports = {
  updateTemplate
};
