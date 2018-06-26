const Models = require('../../models/sequelize');

let client = null;
let Friend = null;
let User = null;


function create(userA, userB) {
  let friendBody = {
    UserA_id: userA,
    UserB_id: userB,
  }
  return Friend.create(friendBody);
};

function listFriends(id) {

/*   const queryString = `
    select 
      f.UserA_id as initID,
      f.UserB_id as friendID, 
      u._id as friendRootId,
      u.username as friendUsername,
      u.email as friendEmail
    from friends as f join users as u
      on u._id = f.UserB_id
    where userA_id=?;
  `; */

  const queryString = `
    select 
      f.UserB_id as friendID, 
      u.username as friendUsername,
      u.email as friendEmail
    from friends as f join users as u
      on u._id = f.UserB_id
    where userA_id=?;
  `;

  return client.query(queryString, {
    raw: true,
    replacements: [id], 
    model: User,
  });
}

function checkFriendStatus(userA, userB) {
  return Friend.findOne({
    where: { 
      UserA_id: userA,
      UserB_id: userB, 
    },
  });
}

function removeFriend(userA, userB) {
  return checkFriendStatus(userA, userB)
    .then(item => {
      return item.destroy({ force: true });
    });
}

function removeAllFriends (userA) {
  return listFriends(userA)
    .then( items => {
      return Promise.all( items.map ( item => {
        return removeFriend (userA, item.friendID);
      }));
      // console.log(friendsIdList);
      // return friendsIdList;
    })

}

module.exports = (_client) => {
  Friend = Models(_client).Friend;
  User = Models(_client).User;
  client = _client;
  return {
    create,
    checkFriendStatus,
    listFriends,
    removeFriend,
    removeAllFriends,
  };
};