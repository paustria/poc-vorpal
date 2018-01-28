import chalk from 'chalk';
import fetch from 'node-fetch';

const vorpal = require('vorpal')();

vorpal
  .command('user <user>', 'Get user')
  .action(async (args, callback) => {
    const res = await fetch(`https://api.github.com/users/${args.user}`);
    const body = await res.json();

    if (body.message==="Not Found") {
      console.log(chalk.red(JSON.stringify(body)));
    } else {
      console.log(chalk.green(JSON.stringify(body)));
    }

    callback();
  });

vorpal
  .command('users', 'Get users')
  .action(async (args, callback) => {
    const res = await fetch('https://api.github.com/users');
    const body = await res.json();

    console.log(chalk.green(JSON.stringify(body)));

    callback();
  });

vorpal
  .delimiter('github-connect$')
  .show();
