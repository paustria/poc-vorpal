import chalk from 'chalk';
import fetch from 'node-fetch';
import Promise from 'bluebird';

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

// Play around with Promise all
vorpal
  .command('testPromiseAll <user>', 'Get user')
  .action(async (args, callback) => {
    let res = await fetch(`https://api.github.com/users/${args.user}`);
    const body = await res.json();

    if (body.message==="Not Found") {
      console.log(chalk.red(JSON.stringify(body)));
    }

    res = await fetch(body.followers_url);
    const followers = await res.json();

    const promise = followers.map(async (user) => {
      const url = `https://api.github.com/users/${user.login}`;
      const res = await fetch(url);
      const body = await res.json();

      return body;
    });

    await Promise.all(promise).then((followerInfo) => {
      console.log(followerInfo);
      callback();
    });

  });

vorpal
  .delimiter('github-connect$')
  .show();
