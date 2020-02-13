
const generateHTML = require('./generateHTML');
const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
const pdf = require('html-pdf');

const userData = {
    user: '',
    name: '',
    color: '',
    location: '',
    company: '',
    bio: '',
    following: '',
    followers: '',
    public_repos: '',
    public_gists: '',
    html_url: '',
    avatar_url: '',
    blog: '',
};


function writeToFile(newFile, html) {
    console.log('Making your PDF file ...');
    fs.writeFile(newFile, html, (err) => {
        if (err) {
            return console.log(err);
        }
    });
    const options = {
        format: 'A3',
        orientation: 'landscape',
    };
    pdf.create(html, options).toFile(`./${userData.user}.pdf`, (err) => {
        console.log('File Created!');
        if (err) {return console.log(err);
        };
    });
};

function userPrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'user',
            message: 'What is your GitHub Username?',
        },
        {
            type: 'checkbox',
            message: 'Please select a color using the SPACE key.',
            name: 'color',
            choices: [
                'pink',
                'blue',
                'green',
                'red',
            ],
        },
    ]).then((data) => {
        const newFile = data.user.toLowerCase().split('').join('') + '.html';
        userData.user = data.user;
        userData.color = data.color;

        axios
            .get(`https://api.github.com/users/${data.user}`)
            .catch(e => {
                console.log("Not a valid username");
            })
            .then((res) => {

                userData.name = res.data.name;
                userData.location = res.data.location;
                userData.company = res.data.company;
                userData.bio = res.data.bio;
                userData.public_repos = res.data.public_repos;
                userData.public_gists = res.data.public_gists;
                userData.followers = res.data.followers;
                userData.following = res.data.following;
                userData.html_url = res.data.html_url;
                userData.avatar_url = res.data.avatar_url;
                userData.blog = res.data.blog;
                const html = generateHTML.generateHTML(userData);
                writeToFile(newFile, html);

            });
    })
};

userPrompt();