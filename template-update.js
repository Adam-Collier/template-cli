const fs = require("fs-extra");
const chalk = require("chalk");

let updateTemplate = workingDir => {
  fs.readdir(workingDir, function(err, items) {
    if (err) console.log(err);
    let success = ["views", "package.json", "main.js", "index.html"].every(
      val => items.includes(val)
    );
    if (success) {
      fetch("https://www.missguided.co.uk/")
        .then(response => response.text())
        .then(data => {
          const $ = cheerio.load(data);
          $(".main").html('<div data-include="index"></div>');
          $("body").append('<script src="main.js"></script>');
          data = $.html();
          fs.writeFile(`${workingDir}/index.html`, data, err => {
            if (err) console.log(err);
            console.log(
              chalk.gray.bgGreen.bold(
                "Your template has been successfully updated"
              )
            );
          });
        })
        .catch(err => console.log(err));

      fs.readdir(`${workingDir}/views`, function(err, items) {
        if (items.includes("your-html.html")) {
          fs.rename(
            `${workingDir}/views/your-html.html`,
            `${workingDir}/views/index.html`
          );
          console.log(chalk.gray.bgGreen.bold("your views were updated"));
        } else {
          console.log(chalk.white.bgRed.bold("the file doesn't exist"));
        }
      });
    } else {
      console.log(chalk.white.bgRed.bold("this isn't a template directory"));
    }
  });
};

module.exports = {
  updateTemplate
};
