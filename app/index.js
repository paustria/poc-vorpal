const vorpal = require('vorpal')();
const chalk = require('chalk');
const fetch = require('node-fetch');

vorpal
  .command('user <user>', 'Get user')
  .action(function(args, callback) {
    fetch(`https://api.github.com/users/${args.user}`)
      .then(res => res.json())
      .then(body => {
        if (body.message==="Not Found") {
          console.log(chalk.red(JSON.stringify(body)));
        } else {
          console.log(chalk.green(JSON.stringify(body)));
        }
        callback();
      });
  });

vorpal
  .command('users', 'Get users')
  .action((args, callback) => {
    try {
      fetch('https://api.github.com/users')
      .then(res => res.json())
      .then(body => {
        console.log(chalk.green(JSON.stringify(body)));
        callback();
      });
    } catch (e) {
      console.log(chalk.red(e));
      callback();
    }
  });

vorpal
  .delimiter('github-connect$')
  .show();