const inquire = require('inquirer');
const fs = require('fs');

const promptUser = () => {
   return inquire.prompt([
       { 
        type: 'input',
        name: 'title',
        message: 'What is your repository name?',
        validate: (answer) => {
          if (answer === '') { 
            return 'Please enter a valid title';
          };
          return true; // return true so it can go to next input
        }
       },
       { 
        type: 'input',
        name: 'description',
        message: 'Write your description'
        }, 
        { 
        type: 'checkbox',
        name: 'dependencies',
        message: 'Technologies / Skill you using on this repository',
        choices: ['HTML', 'CSS', 'Javascript', 'Python', 'Java'],
        default: 'Javascript'
        },
        {
        type: 'checkbox',
        name: 'license',
        message: 'What kind of license should your project have?',
        choices: ['Apache 2.0', 'MIT', 'GNU GPL v3.0'],
        default: 'MIT'
      },  
   ]);ddd
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
const generateREADME = ({ title, description, dependencies, license }) =>
`
# ${title}

## Description

${description}

## Dependencies

${generateCustomDisplay(dependencies)}

## License

${generateCustomDisplay(license)}
`;

const init = () => {
    promptUser()
      // Use writeFileSync method to use promises instead of a callback function
      .then((answers) => fs.writeFileSync('README.md', generateREADME(answers)))
      .then(() => console.log('Successfully wrote to README.md'))
      .catch((err) => console.error(err));
  };
  
  init();