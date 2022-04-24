const userEmail = localStorage.getItem('trybewallet-user');
const INITIAL_STATE = { email: userEmail || '' };

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
