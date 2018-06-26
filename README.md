# Project 4: Dynamic Recipe Storage App Backend Overhaul

## Overview

*As of 6/26/2018, this project is marked complete. The unfinished tasks will be continued after further educational pursuits.*

Fullstack application being developed for educational purposes, using the MERN stack.

The original app can be found here:

- <https://github.com/mtanzim/recipeAppMERN>

The following repositories will be used for guidance:

- <https://github.com/mtanzim/fcchn-blog-backend>
- <https://github.com/mtanzim/databasesForNode>
- <https://github.com/mtanzim/nodeJSExpressEssentials>
- <https://github.com/mtanzim/nodeJSEssentialTraining>

### Objectives

Take existing app and improve the app with knowledge acquired over the past projects.

### Overall Improvements

- [ ] Implement a friend's list feature on front and back end
- [ ] Implement a live chat, exercising socket IO

### Back end Improvements

- [x] Updated routing strategies
- [x] Use of es6 code/transpiling with babel
- [x] Unit testing with Mocha for each API instance
- [x] General code cleanup following best practices
- [x] Improve understanding of Mongo/Mongoose
- [x] Mocking relations with Mongoose Populate
- [x] Usage of MySQL database in conjunction with Mongo
- [x] Implement a friend's list feature with SQL
- [ ] Integration of Redis for sessions storage
- [ ] Authentication with JWT
- [ ] Improvements to async code with async/await functions in conjunction with promises

### Front End Improvements

- [ ] Take existing app and improve the front end with knowledge acquired over the past projects
- [ ] Implement state managment through redux (possibly study redux in greater detail through Lynda.com)
- [ ] Clean up React code; learn and apply lifecycle mangaement hooks
- [ ] Convert to an app using React Native

### Lessons Learned

- SQL/Sequelize
  - Creating models (data types, primary keys, foreign keys, associations)
  - CRUD operations through ORM (queries, attribute selection)
  - Hooks and custom methods (password hashing)
  - Promise based operations
  - [Creating a friend list with an RDB](https://stackoverflow.com/questions/3058281/buddy-list-relational-database-table-design)
  - Creating a many to many relationship with the [friend list model](./app/models/sequelize/friends.js)
  - Executing raw queries as required when object functions are more cumbersome
    - See [user model](./app/models/sequelize/users.js)
    - See [friend sql controller](./app/controllers/sequelize/friends.controller.js)
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
  - Note to create designs that are scalable (example: adding SQL API tests required a lot of unnecessary factoring, default parameters etc.)
- Postman Testing
- [package.json scripts](./package.json)
- JS/ES6
  - ES6 vs CommonJS import/export
  - Promisifying functions for improved/more readble async code
  - Setting up babel for node (mocha is still problematic)
  - **How to avoid/work around circular references** - see [Mongoose models](./app/models/mongoose/)
  - Chaining promieses and passing errors to the right place see [Sequelize controllers](./app/controllers/sequelize/)
  - Using commonJS module manager to avoid creating singleton modules
    - See the following files:
      - [app.js](./app.js)
      - [Recipes/Ingredients Router Index](./app/routes/index.js)
      - [Recipes/Ingredients Router](./app/routes/sequelize/recipes.ingredients.routes.js)
      - [Recipes/Ingredients Controller](./app/controllers/sequelize/recipes.ingredients.controller.js)
    - See the following articles
      - [Singleton Pattern Wiki](https://en.wikipedia.org/wiki/Singleton_pattern)
      - [How not to cretae a singleton pattern in NodeJS](https://medium.com/@iaincollins/how-not-to-create-a-singleton-in-node-js-bd7fde5361f5)
      - [Introduction to JS Modules](https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc)
    - Key Takeaways
      - When using common JS, use the new keyword with the require
      - ES6 modules allow dynamic loading (further reading required for a better understanding)