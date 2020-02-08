

const fs = require("fs");
const inquirer = require("inquirer")
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// const questions = [];

function userPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "Github username",
            message: "What is your GitHub username?"
        },
        {
            type: "checkbox",
            name: "Color",
            message: "Choose your favorite color.",
            choices: [
                "Red",
                "Pink",
                "Green",
                "Blue"
            ]
        }
    ])
};

userPrompt()
    .then(function (data) {
        const html = generateHTML(data);
        return writeFileAsync("index.html", html);
    })
    .then(function () {
        console.log("Successfully wrote to index.html");
    })
    .catch(function (err) {
        console.log(err);
    });


// function writeToFile(fileName, data) {

// }

// function init() {

//     init();
