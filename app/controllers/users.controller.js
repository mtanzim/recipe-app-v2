import User from '../models/users';

function list () {
  // console.log ('coming to user controller!');
  return new Promise ( (resolve, reject) => {
    reject (new Error ('Fuck!!'));
    setTimeout(() => {
      resolve({ user: 'fake' });
    }, 3000);
  })
  
}

function createDefault () {
  let defaultUser = {
    username: 'tmokamme',
    password: '12345678',
    email: 'mtanzim@test.com',
    firstname: 'Tanzim',
    lastname: 'Mokammel',
    description: 'First ever user!',
  }
  const user = new User(defaultUser);
  return user.save();
}

module.exports = {
  list,
  createDefault,
};