# Template CLI

## Getting Started

```bash
# clone the repo
$ git clone https://github.com/Adam-Collier/template-cli.git

# change directory
$ cd template-cli

# install NPM dependencies
$ npm install

# creates a symlink (makes template command available)
$ npm link
```

## Project structure

```
.
├── README.md
├── index.js
├── package-lock.json
├── package.json
├── template
│   ├── gulpfile.js
│   ├── index.html
│   ├── main.js
│   ├── package-lock.json
│   ├── package.json
│   └── views
│       └── index.html
├── template-create.js
├── template-update.js
└── utils
```

Note: please use this command when re rendering the tree

```bash
$ tree -I 'node_modules'
```

## List of Packages

| Package    | Description                                               |
| ---------- | --------------------------------------------------------- |
| chalk      | Terminal string styling done right                        |
| cheerio    | JQuery for the server                                     |
| commander  | The complete solution for node.js command-line program    |
| fs-extra   | Extends the fs node module                                |
| node-fetch | A light-weight module that brings window.fetch to Node.js |

## Usage

To create a new template 

```bash
$ template create [name]
```

once youre template is created

```bash
$ cd [name]

$ npm install 

$ npm start
```

To update an existing template

```bash
# cd into the template you want to update
$ template --update

#or
$ template -u 
```

A success message will show when your template has been updated


