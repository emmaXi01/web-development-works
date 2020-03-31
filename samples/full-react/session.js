// Baby simple session tracking
const sessions = {};

const uuid = () => {
  // real code would use a real uuid!
  return (Math.random()*1000).toFixed(4);
};

const addSession = ( sessionData ) => {
  const id = uuid();
  sessions[id] = { ...sessionData, id };
  return sessions[id];
};

const deleteSession = (id) => {
  const session = sessions[id];
  delete sessions[id];
  return session;
};

module.exports = {
  sessions,
  addSession,
  deleteSession,
};
