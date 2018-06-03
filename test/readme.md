# TOC
   - [API](#api)
     - [API.user](#api-apiuser)
     - [API.user.loop](#api-apiuserloop)
     - [API.auth](#api-apiauth)
     - [API.auth.loop](#api-apiauthloop)
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
request(app).post("/api/users/").send(defUser).expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  var response = JSON.parse(res.text);
  var createdUser = _.omit(defUser, "local.password");
  // const { password, ...createdUser } = defUser;
  response = _.omit(response, "local.password");
  expect(response.local).to.deep.equal(createdUser.local);
  // expect(response.local).to.deep.equal(defUser.local);
  userId = response._id;
  done();
});
```

READ One User.

```js
request(app).get('/api/users/' + userId).set('Accept', 'application/json').expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  expect(JSON.parse(res.text)._id).to.equal(userId);
  done();
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
request(app).delete('/api/users/' + userId).set('Accept', 'application/json').expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  // user = JSON.parse(res.text) || undefined;
  done();
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
  var response = JSON.parse(res.text);
  var createdUser = _.omit(defUser, "local.password");
  response = _.omit(response, "local.password");
  expect(response.local).to.deep.equal(createdUser.local);
  userId = response._id;
  done();
});
```

AUTH login.

```js
request(app).post("/api/auth/login").expect(200).send(defUser.local).end(function (err, res) {
  if (err) done(new Error(res.text));
  done();
});
```

Auth DELETE One User.

```js
request(app).delete('/api/users/' + userId).set('Accept', 'application/json').expect(200).end(function (err, res) {
  if (err) done(new Error(res.text));
  // user = JSON.parse(res.text) || undefined;
  done();
});
```

