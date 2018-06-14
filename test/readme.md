# TOC
   - [API Mongoose](#api-mongoose)
     - [API.user](#api-mongoose-apiuser)
     - [API.user.loop](#api-mongoose-apiuserloop)
     - [API.auth](#api-mongoose-apiauth)
     - [API.auth.loop](#api-mongoose-apiauthloop)
     - [API.recipe](#api-mongoose-apirecipe)
     - [API.recipe.loop](#api-mongoose-apirecipeloop)
     - [API.ingredients](#api-mongoose-apiingredients)
     - [API.ingredients.loop](#api-mongoose-apiingredientsloop)
   - [API SQL](#api-sql)
     - [API.user.sql](#api-sql-apiusersql)
     - [API.user.sql.loop](#api-sql-apiusersqlloop)
     - [API.recipe.sql](#api-sql-apirecipesql)
     - [API.recipe.sql.loop](#api-sql-apirecipesqlloop)
     - [API.ingredients.sql](#api-sql-apiingredientssql)
     - [API.ingredients.sql.loop](#api-sql-apiingredientssqlloop)
<a name=""></a>
 
<a name="api-mongoose"></a>
# API Mongoose
<a name="api-mongoose-apiuser"></a>
## API.user
GETS health check.

```js
request(app).get('/' + baseUrl + '/health-check').set('Accept', 'application/json').expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  done();
});
```

GETS All Users.

```js
request(app).get('/' + baseUrl + '/users').expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  done();
});
```

CREATE One User.

```js
testCreateUser(defUser).then(function (id) {
  userId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

READ One User.

```js
testReadUser(userId).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

UPDATE One User.

```js
// console.log(userId);
    // console.log(userUpdate);
    request(app).put('/' + baseUrl + '/users/' + userId).set('Accept', 'application/json').send(userUpdate).expect(200).end(function (err, res) {
      if (err) done(new Error(res.text));
      if (dbType === "mongo") {
        expect(JSON.parse(res.text)._id).to.equal(userId);
        expect(JSON.parse(res.text).local.email).to.equal(emailUpdate);
      } else {
        expect(JSON.parse(res.text)._id).to.equal(userId);
        expect(JSON.parse(res.text).email).to.equal(emailUpdate);
      }
      done();
    });
```

DELETE One User.

```js
testDeleteUser(userId).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

<a name="api-mongoose-apiauth"></a>
## API.auth
AUTH health check.

```js
request(app).get("/api/auth/").expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  done();
});
```

AUTH signup.

```js
request(app).post("/api/auth/signup").send(defUser.local).expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  userId = checkUser(res)._id;
  done();
});
```

AUTH login.

```js
request(app).post("/api/auth/login").expect(200).send(defUser.local).end(function (err, res) {
  if (err) done(new Error(res.text));
  checkUser(res);
  done();
});
```

AUTH change password.

```js
request(app).post('/api/auth/changepass/' + userId).expect(200).send({ "password": "adadadadadadadadadadadaa" }).end(function (err, res) {
  if (err) done(new Error(res.text));
  checkUser(res);
  done();
});
```

AUTH change password too short.

```js
request(app).post('/api/auth/changepass/' + userId).expect(500).send({ "password": "a" }).end(function (err, res) {
  // expect(err);
  // console.log(res.text);
  if (err) done(err);else done();
});
```

Auth DELETE One User.

```js
testDeleteUser(userId).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

<a name="api-mongoose-apirecipe"></a>
## API.recipe
CREATE One User for Recipe.

```js
testCreateUser(defUser).then(function (id) {
  userId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

READ One User for Recipe.

```js
testReadUser(userId).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

CREATE recipe for User that was created.

```js
testCreateRecipe(userId, defRecipe).then(function (recipeid) {
      recipeId = recipeid;
      // console.log(recipeId);
      done();
    }).catch(function (err) {
      return done(err);
    });
```

Read Recipe that was created.

```js
testReadRecipe(recipeId, defRecipe).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Update Recipe that was created.

```js
testUpdateRecipe(recipeId, { "notes": "updated from mocha" }).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Delete Recipe that was created.

```js
testDeleteRecipe(recipeId).then(function () {
  recipeId = undefined;
  done();
}).catch(function (err) {
  return done(err);
});
```

CREATE duplicate recipe for User that was created.

```js
testCreateRecipe(userId, defRecipe).then(function (recipeid) {
      recipeId = recipeid;
      // console.log(recipeId);
      done();
    }).catch(function (err) {
      return done(err);
    });
```

CREATE duplicate recipe again for User that was created.

```js
testCreateRecipe(userId, defRecipe).then(function (recipeid) {
      recipeId = recipeid;
      // console.log(recipeId);
      done();
    }).catch(function (err) {
      return done(err);
    });
```

Delete Recipes for the User that was created.

```js
testDeleteRecipeForUser(userId, 2).then(function () {
  // userId = undefined;
  recipeId = undefined;
  done();
}).catch(function (err) {
  return done(err);
});
```

CREATE duplicate recipe for User that was created for batch delete with User.

```js
testCreateRecipe(userId, defRecipe).then(function (recipeid) {
      recipeId = recipeid;
      // console.log(recipeId);
      done();
    }).catch(function (err) {
      return done(err);
    });
```

CREATE duplicate recipe again for User that was created for batch delete with User.

```js
testCreateRecipe(userId, defRecipe).then(function (recipeid) {
      recipeId = recipeid;
      // console.log(recipeId);
      done();
    }).catch(function (err) {
      return done(err);
    });
```

DELETE One User for Recipe.

```js
testDeleteUser(userId).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Test recipe was deleted with user.

```js
testRecipeDanglers(recipeId).then(function (res) {
  // console.log(res);
  done();
}).catch(function (err) {
  return done(err);
});
```

<a name="api-mongoose-apiingredients"></a>
## API.ingredients
GETS health check.

```js
request(app).get("/api/health-check").set('Accept', 'application/json').expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  done();
});
```

CREATE One User for Recipe.

```js
testCreateUser(defUser).then(function (id) {
  userId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

READ One User for Recipe.

```js
testReadUser(userId).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

CREATE recipe for User that was created.

```js
testCreateRecipe(userId, defRecipe).then(function (recipeid) {
  recipeId = recipeid;
  // console.log(recipeId);
  done();
}).catch(function (err) {
  return done(err);
});
```

Read Recipe that was created.

```js
testReadRecipe(recipeId, defRecipe).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Create ingredient for recipe that was created.

```js
testCreateIng(recipeId, defIng).then(function (id) {
  ingId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

Read ingredient for recipe that was created.

```js
testReadIng(ingId, defIng).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Update ingredient for recipe that was created.

```js
testUpdateIng(ingId, { "title": "pate superloaded" }).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Delete ingredient for recipe that was created.

```js
testDeleteIng(ingId).then(function () {
  ingId = undefined;
  done();
}).catch(function (err) {
  return done(err);
});
```

Create duplicate ingredient for recipe that was created.

```js
testCreateIng(recipeId, defIng).then(function (id) {
  ingId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

Create duplicate ingredient again for recipe that was created.

```js
testCreateIng(recipeId, defIng).then(function (id) {
  ingId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

Read all ingredient for recipe that was created.

```js
testReadIngAll(recipeId, 2).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Delete all ingredient for recipe that was created to prep for batch delete.

```js
testDeleteIngForRecipe(recipeId, 2).then(function () {
  ingId = undefined;
  done();
}).catch(function (err) {
  return done(err);
});
```

Create duplicate ingredient again for recipe that was created to prep for batch delete again.

```js
testCreateIng(recipeId, defIng).then(function (id) {
  ingId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

Create duplicate ingredient again for recipe that was created.

```js
testCreateIng(recipeId, defIng).then(function (id) {
  ingId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

Delete Recipe that was created.

```js
testDeleteRecipe(recipeId).then(function () {
  // ingId =undefined;
  recipeId = undefined;
  done();
}).catch(function (err) {
  return done(err);
});
```

Test ingredient was deleted with recipe.

```js
testIngDanglers(ingId).then(function (res) {
  done();
}).catch(function (err) {
  return done(err);
});
```

DELETE One User for Recipe.

```js
testDeleteUser(userId).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

<a name="api-sql"></a>
# API SQL
<a name="api-sql-apiusersql"></a>
## API.user.sql
GETS health check.

```js
request(app).get('/' + baseUrl + '/health-check').set('Accept', 'application/json').expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  done();
});
```

GETS All Users.

```js
request(app).get('/' + baseUrl + '/users').expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  done();
});
```

CREATE One User.

```js
testCreateUser(defUser).then(function (id) {
  userId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

READ One User.

```js
testReadUser(userId).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

UPDATE One User.

```js
// console.log(userId);
    // console.log(userUpdate);
    request(app).put('/' + baseUrl + '/users/' + userId).set('Accept', 'application/json').send(userUpdate).expect(200).end(function (err, res) {
      if (err) done(new Error(res.text));
      if (dbType === "mongo") {
        expect(JSON.parse(res.text)._id).to.equal(userId);
        expect(JSON.parse(res.text).local.email).to.equal(emailUpdate);
      } else {
        expect(JSON.parse(res.text)._id).to.equal(userId);
        expect(JSON.parse(res.text).email).to.equal(emailUpdate);
      }
      done();
    });
```

DELETE One User.

```js
testDeleteUser(userId).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

<a name="api-sql-apirecipesql"></a>
## API.recipe.sql
CREATE One User for Recipe.

```js
testCreateUser(defUser).then(function (id) {
  userId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

READ One User for Recipe.

```js
testReadUser(userId).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

CREATE recipe for User that was created.

```js
testCreateRecipe(userId, defRecipe).then(function (recipeid) {
      recipeId = recipeid;
      // console.log(recipeId);
      done();
    }).catch(function (err) {
      return done(err);
    });
```

Read Recipe that was created.

```js
testReadRecipe(recipeId, defRecipe).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Update Recipe that was created.

```js
testUpdateRecipe(recipeId, { "notes": "updated from mocha" }).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Delete Recipe that was created.

```js
testDeleteRecipe(recipeId).then(function () {
  recipeId = undefined;
  done();
}).catch(function (err) {
  return done(err);
});
```

CREATE duplicate recipe for User that was created.

```js
testCreateRecipe(userId, defRecipe).then(function (recipeid) {
      recipeId = recipeid;
      // console.log(recipeId);
      done();
    }).catch(function (err) {
      return done(err);
    });
```

CREATE duplicate recipe again for User that was created.

```js
testCreateRecipe(userId, defRecipe).then(function (recipeid) {
      recipeId = recipeid;
      // console.log(recipeId);
      done();
    }).catch(function (err) {
      return done(err);
    });
```

Delete Recipes for the User that was created.

```js
testDeleteRecipeForUser(userId, 2).then(function () {
  // userId = undefined;
  recipeId = undefined;
  done();
}).catch(function (err) {
  return done(err);
});
```

CREATE duplicate recipe for User that was created for batch delete with User.

```js
testCreateRecipe(userId, defRecipe).then(function (recipeid) {
      recipeId = recipeid;
      // console.log(recipeId);
      done();
    }).catch(function (err) {
      return done(err);
    });
```

CREATE duplicate recipe again for User that was created for batch delete with User.

```js
testCreateRecipe(userId, defRecipe).then(function (recipeid) {
      recipeId = recipeid;
      // console.log(recipeId);
      done();
    }).catch(function (err) {
      return done(err);
    });
```

DELETE One User for Recipe.

```js
testDeleteUser(userId).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Test recipe was deleted with user.

```js
testRecipeDanglers(recipeId).then(function (res) {
  // console.log(res);
  done();
}).catch(function (err) {
  return done(err);
});
```

<a name="api-sql-apiingredientssql"></a>
## API.ingredients.sql
GETS health check.

```js
request(app).get("/api/health-check").set('Accept', 'application/json').expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  done();
});
```

CREATE One User for Recipe.

```js
testCreateUser(defUser).then(function (id) {
  userId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

READ One User for Recipe.

```js
testReadUser(userId).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

CREATE recipe for User that was created.

```js
testCreateRecipe(userId, defRecipe).then(function (recipeid) {
  recipeId = recipeid;
  // console.log(recipeId);
  done();
}).catch(function (err) {
  return done(err);
});
```

Read Recipe that was created.

```js
testReadRecipe(recipeId, defRecipe).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Create ingredient for recipe that was created.

```js
testCreateIng(recipeId, defIng).then(function (id) {
  ingId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

Read ingredient for recipe that was created.

```js
testReadIng(ingId, defIng).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Update ingredient for recipe that was created.

```js
testUpdateIng(ingId, { "title": "pate superloaded" }).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Delete ingredient for recipe that was created.

```js
testDeleteIng(ingId).then(function () {
  ingId = undefined;
  done();
}).catch(function (err) {
  return done(err);
});
```

Create duplicate ingredient for recipe that was created.

```js
testCreateIng(recipeId, defIng).then(function (id) {
  ingId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

Create duplicate ingredient again for recipe that was created.

```js
testCreateIng(recipeId, defIng).then(function (id) {
  ingId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

Read all ingredient for recipe that was created.

```js
testReadIngAll(recipeId, 2).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

Delete all ingredient for recipe that was created to prep for batch delete.

```js
testDeleteIngForRecipe(recipeId, 2).then(function () {
  ingId = undefined;
  done();
}).catch(function (err) {
  return done(err);
});
```

Create duplicate ingredient again for recipe that was created to prep for batch delete again.

```js
testCreateIng(recipeId, defIng).then(function (id) {
  ingId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

Create duplicate ingredient again for recipe that was created.

```js
testCreateIng(recipeId, defIng).then(function (id) {
  ingId = id;
  done();
}).catch(function (err) {
  return done(err);
});
```

Delete Recipe that was created.

```js
testDeleteRecipe(recipeId).then(function () {
  // ingId =undefined;
  recipeId = undefined;
  done();
}).catch(function (err) {
  return done(err);
});
```

Test ingredient was deleted with recipe.

```js
testIngDanglers(ingId).then(function (res) {
  done();
}).catch(function (err) {
  return done(err);
});
```

DELETE One User for Recipe.

```js
testDeleteUser(userId).then(function () {
  return done();
}).catch(function (err) {
  return done(err);
});
```

