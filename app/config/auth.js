'use strict';

module.exports = {
  'githubAuth': {
    'clientID': process.env.GITHUB_KEY,
    'clientSecret': process.env.GITHUB_SECRET,
    'callbackURL': process.env.APP_URL + 'auth/github/callback'
  },
  'facebookAuth': {
    'clientID': process.env.FB_KEY, // your App ID
    'clientSecret': process.env.FB_SECRET, // your App Secret
    'callbackURL': process.env.APP_URL + 'auth/facebook/callback',
    'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    'profileFields': ['id', 'email', 'name'] // For requesting permissions from Facebook API
  },
};
