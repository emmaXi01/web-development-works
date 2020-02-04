const users = {
  "11": {
    username: "Amit",
    active: true,
    uid: '11',
  },
  "43": {
    username: "Bao",
    active: true,
    uid: 43,
  },
};

const messages = [
  {
    sender: "11",
    timestamp: new Date("2019-01-01 19:20:00"),
    text: "You up?",
  },
  {
    sender: "43",
    timestamp: new Date("2019-01-01 19:21:00"),
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

function addMessage({ uid, timestamp=new Date(), text }) {
  messages.push({ sender: uid, timestamp, text });
}

function userExists(username) {
  // Linear search (ew) - better to have second object to map username => uid
  const record = Object.values(users).find(user => user.username === username);
  return record && record.uid;
}

function addUser(username) {
  // In real world, use a uuid/guid instead

  const oldId = userExists(username);
  const id = oldId || Math.floor(Math.random() * 10000);
  users[id] = { username, active: true, uid: id };
  return id;
}

function removeUser(uid) {
  if(users[uid]) {
    users[uid].active = false;
  }
}

const chat = {
  users,
  messages,
  addMessage,
  addUser,
  removeUser,
};

module.exports = chat;

