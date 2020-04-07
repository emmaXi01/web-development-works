const reducer = (state, action) => {
  state = {...state, lastActive: Date.now() };
  switch(action.type) {
    case 'changeTheme':
      return { ...state, theme: action.theme };
    case 'updatePersonalInfo':
      return { ...state, ...action.info };
    case 'updateLastActive':
      return state;
    default:
      return state;
  }
};

export default reducer;
