#!/usr/bin/env node
"use strict";

const program = require("commander");
let { createTemplate } = require("./template-create");
let { updateTemplate } = require("./template-update");

const chalk = require("chalk");

program
  .version("0.1.0")
  .command("create [name]", "create a new template")
  .action(function(env, options) {
    console.log(
      chalk.blue.bold(
        `Creating your template at ${process.cwd()} \n-------------------------------------------`
      )
    );
    createTemplate(process.cwd(), options);
  });

program.option("-u, --update", "update an existing template");

program.parse(process.argv);

if (program.update) {
  updateTemplate(process.cwd());
}
