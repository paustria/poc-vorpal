const vorpal = require('vorpal')();
const fetch = require('node-fetch');

vorpal
  .command('user <user>', 'Get user')
  .action(function(args, callback) {
    fetch(`https://api.github.com/users/${args.user}`)
      .then(res => res.json())
      .then(body => {
        console.log(body)
        callback();
      });
  });

vorpal
  .command('users', 'Get users')
  .action(function(args, callback) {
    fetch(`https://api.github.com/users`)
      .then(res => res.json())
      .then(body => {
        console.log(body)
        callback();
      });
  });

vorpal
  .delimiter('github-connect$')
  .show();