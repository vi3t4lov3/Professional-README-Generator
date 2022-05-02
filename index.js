const inquire = require('inquirer');
const fs = require('fs');

//Questions
const questions = [
  { 
  type: 'input',
  name: 'title',
  message: 'What is your repository name?',
  validate: (answer) => {
  // (answer === '') ? 'Please enter a valid title' : 'true';
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
  // validate: (answer) => {
  //   if (answer === '') { return 'You had not selected your languages'}; return true}
  },
  { 
  type: 'editor',
  name: 'installation',
  message: 'What are the steps required to install your project?',
  validate: (answer) => {
    if (answer === '') { return 'Installation empty, please enter your installation'}; return true}
  }, 
  {
  type: 'checkbox',
  name: 'license',
  message: 'What kind of license should your project have?',
  choices: ['Apache 2.0', 'MIT', 'GNU GPL v3.0'],
  // validate: (answer) => {
  //   if (answer === '') { return 'You had not selected your license'}; return true}
  }
];

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

//template README 
const generateREADME = ({ title, description, installation, dependencies, license }) =>
`
# ${title}

## Description

${description}

## Dependencies

${generateCustomDisplay(dependencies)}

## installation

${installation}

## Contributing

## License

${generateCustomDisplay(license)}
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