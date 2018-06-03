# TOC
   - [Recipe App User API](#recipe-app-user-api)
<a name=""></a>
 
<a name="recipe-app-user-api"></a>
# Recipe App User API
GETS health check.

```js
request(app)
  .get("/api/health-check")
  .set('Accept', 'application/json')
  .expect(200)
  .end(function (err, res) {
    if (err) done(new Error(res.text));
    done();
  });
```

GETS All Users.

```js
request(app)
  .get("/api/users")
  .expect(200)
  .end(function (err, res) {
    if (err) done(new Error(res.text));
    done();
  });
```

CREATE One User.

```js
request(app)
  .post("/api/users/")
  .send(defUser)
  .expect(200)
  .end(function (err, res) {
    if (err) done(new Error(res.text));
    let response = (JSON.parse(res.text));
    defUser.local.password = null;
    response.local.password = null;
    expect(response.local).to.deep.equal(defUser.local);
    userId = response._id;
    done();
  });
```

READ One User.

```js
request(app)
  .get(`/api/users/${userId}`)
  .set('Accept', 'application/json')
  .expect(200)
  .end(function (err, res) {
    if (err) done(new Error(res.text));
    expect(JSON.parse(res.text)._id).to.equal(userId);
    done();
  });
```

UPDATE One User.

```js
request(app)
  .put(`/api/users/${userId}`)
  .set('Accept', 'application/json')
  .send({ local: { email: "fromMocha@jocha.com" } })
  .expect(200)
  .end(function (err, res) {
    if (err) done(new Error(res.text));
    expect(JSON.parse(res.text)._id).to.equal(userId);
    expect(JSON.parse(res.text).local.email).to.equal("fromMocha@jocha.com");
    done();
  });
```

DELETE One User.

```js
request(app)
  .delete(`/api/users/${userId}`)
  .set('Accept', 'application/json')
  .expect(200)
  .end(function (err, res) {
    if (err) done(new Error(res.text));
    user = JSON.parse(res.text) || undefined;
    done();
  });
```

