const inquire = require('inquirer');
const fs = require('fs');

//Questions VIM i to insert then esc to exit + :x to save 
const questions = [
  { 
  type: 'input',
  name: 'title',
  message: 'What is your repository name?',
  validate: (answer) => {
    if (answer === '') { return 'Please enter a valid title'}; return true}
  },
  { 
  type: 'editor', //using the vim 
  name: 'description',
  message: 'Write your description',
  validate: (answer) => {
    if (answer === '') { return 'Description empty, please enter your description'}; return true}
  }, 
  { 
  type: 'checkbox',
  name: 'dependencies',
  message: 'Technologies / Skill you using on this repository',
  choices: ['HTML', 'CSS', 'Javascript', 'Python', 'Java'],
  },
  { 
  type: 'editor',
  name: 'installation',
  message: 'What are the steps required to install your project?',
  validate: (answer) => {
    if (answer === '') { return 'Installation empty, please enter your installation'}; return true}
  }, 
  { 
    type: 'editor',
    name: 'usage',
    message: 'Provide instructions and examples for use',
    validate: (answer) => {
      if (answer === '') { return 'It empty, please enter your usage'}; return true}
  }, 
  { 
    type: 'editor',
    name: 'contribute',
    message: 'Provice guideline for other developer contribute it',
    validate: (answer) => {
      if (answer === '') { return 'It empty, please write the guideline for contribute'}; return true}
  },
  { 
    type: 'editor',
    name: 'test',
    message: 'Write tests for your application',
    validate: (answer) => {
      if (answer === '') { return 'It empty, provide examples on how to run them here.'}; return true}
  },
  {
  type: 'input',
  name: 'githubUser',
  message: 'What is your Github username?',
  validate: (answer) => {
    if (answer === '') { return 'Please enter a valid username'}; return true}
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email?',
    validate: (answer) => {
      if (answer === '') { return 'Please enter a valid email'}; return true}
  },
  {
    type: 'input',
    name: 'demo',
    message: 'Please enter your demo link here?',
    validate: (answer) => {
      if (answer === '') { return 'Please enter a valid links'}; return true}
  },
  {
    type: 'list',
    name: 'license',
    message: 'What kind of license should your project have?',
    choices: ['None', 'Apache 2.0', 'MIT', 'GNU GPL 3.0'],
    default: 'None'
    },
];

//add the - & \n for each value when value had been selected
const promptUser = (questions) => {
   return inquire.prompt(questions);
};
// Custom the readme display after you input the value from promptUser
const generateCustomDisplay = (answers) => {
  let response = '';
  for (let i = 0; i < answers.length; i++) {
    response += `- ${answers[i]}`;

    if (i < answers.length - 1) {
      response += '\n';
    }
  }
  return response;
};
// display the license 
function generateLicenseBadge(license) {
  if (license === 'Apache 2.0') {
    return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
  } if (license === 'MIT') { 
    return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
  } if (license === 'GNU GPL 3.0') { 
    return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
  } if (license === 'None') { 
    return `No License found`
  }
  //if it empty
  { return `Feel free to do whatever you want to do with my code`
 } 
}

//template README 
const generateREADME = ({ title, description, installation, dependencies, usage, contribute, license, githubUser, test, email, demo}) =>
`
# ${title}
## Description
${description}
## Table of Contents
* [Dependencies](#dependencies)
* [Installation](#installation)
* [Usage](#usage)
* [Contribute](#contribute)
* [Tests](#tests)
* [Questions](#questions)
* [Demo] (#demo)
* [License](#license)
## Dependencies
${generateCustomDisplay(dependencies)}
## Installation
${installation}
## Usage
${usage}
## Contributing
${contribute}
## Tests
${test}
## Demo
[Click here (${demo})
## Questions
If you have questions about this repository reach me by Github: [${githubUser}](https://github.com/${githubUser})
or send an email: ${email} 
## License
${generateLicenseBadge(license)} 
`;

//initial
const init = () => {
    promptUser(questions)
      // Use writeFileSync method to use promises instead of a callback function
      .then((answers) => fs.writeFileSync('README.md', generateREADME(answers)))
      .then(() => console.log('Successfully wrote to README.md'))
      .catch((err) => console.error(err));
  };
  
  init();

  