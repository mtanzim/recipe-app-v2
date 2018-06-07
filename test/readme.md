# TOC
   - [API](#api)
     - [API.user](#api-apiuser)
     - [API.user.loop](#api-apiuserloop)
     - [API.auth](#api-apiauth)
     - [API.auth.loop](#api-apiauthloop)
     - [API.recipe](#api-apirecipe)
     - [API.recipe.loop](#api-apirecipeloop)
<a name=""></a>
 
<a name="api"></a>
# API
<a name="api-apiuser"></a>
## API.user
GETS health check.

```js
request(app).get("/api/health-check").set('Accept', 'application/json').expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  done();
});
```

GETS All Users.

```js
request(app).get("/api/users").expect(200).end(function (err, res) {
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
request(app).put('/api/users/' + userId).set('Accept', 'application/json').send({ local: { email: "fromMocha@jocha.com" } }).expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  expect(JSON.parse(res.text)._id).to.equal(userId);
  expect(JSON.parse(res.text).local.email).to.equal("fromMocha@jocha.com");
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

<a name="api-apiauth"></a>
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

<a name="api-apirecipe"></a>
## API.recipe
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
testDeleteRecipeForUser(userId).then(function () {
  // userId = undefined;
  recipeId = undefined;
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

