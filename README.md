# Project 4: Dynamic Recipe Storage App Backend Overhaul

## Overview

Fullstack application being developed for educational purposes, using the MERN stack.

### Objectives

Take existing app and improve the app with knowledge acquired over the past projects.

### Overall Improvements

- [ ] Implement a friend's list feature
- [ ] Implement a live chat, exercising socket IO

### Back end Improvements

- [x] Updated routing strategies
- [x] Use of es6 code/transpiling with babel
- [x] Unit testing with Mocha
- [ ] Improvements to async code with async/await functions in conjunction with promises
- [x] General code cleanup following best practices
- [x] Improve understanding of Mongo/Mongoose
- [x] Mocking relations with Mongoose Populate
- [ ] Usage of MySQL database in conjunction with Mongo
- [ ] Integration of Redis for sessions storage
- [ ] Authentication with JWT

### Front End Improvements

- [ ] Take existing app and improve the front end with knowledge acquired over the past projects
- [ ] Implement state managment through redux (possibly study redux in greater detail through Lynda.com)
- [ ] Clean up React code; learn and apply lifecycle mangaement hooks
- [ ] Convert to an app using React Native
 


The original app can be found here:

- <https://github.com/mtanzim/recipeAppMERN>

The following repositories will be used for guidance:

- <https://github.com/mtanzim/fcchn-blog-backend>
- <https://github.com/mtanzim/databasesForNode>
- <https://github.com/mtanzim/nodeJSExpressEssentials>
- <https://github.com/mtanzim/nodeJSEssentialTraining>

### Lessons Learned

- Mongoose/MongoDB
  - Select clauses
  - Promise vs callbacks
  - Queries are thenable (then-ing a query executes it automatically)
  - Creating [references in Mongoose](http://mongoosejs.com/docs/populate.html), similar to foreign keys in sql
  - Using the pre 'remove' hooks for cascading deletes, similar to SQL
  - Making sure doc.save, and doc.remove are used to ensure hooks are fired
- Express
  - Error routing and management
  - Export app.js and using bin/www to run the server, and mocha to test concurrently
  - Working with callbacks vs promises
  - Passport.js: passing errors and user around
- Mocha testing
  - Describe, it, before hooks
  - Looping tests in mocha
  - Setting up logging, creating documents
  - Creating re-usable modules in describe, it blocks
- JS/ES6
  - ES6 vs CommonJS import/export
  - Promisifying functions for improved/more readble async code
  - Setting up babel for node (mocha is still problematic)
  - **How to avoid/work around circular references** - see [Mongoose models](./app/models/)
