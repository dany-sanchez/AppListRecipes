import settingsTypes from '../definitions/types/settings';

const initialState = {
  apiData: {
    credits: null,
    lastUpdate: (new Date()).toUTCString()
  }
};

function settings(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case settingsTypes.SET_API_DATA:
      nextState = {
        ...state,
        apiData: action.value
      };
      return nextState || state;
    case settingsTypes.RESET:
      nextState = {
        apiData: {
          credits: null,
          lastUpdate: (new Date()).toUTCString()
        }
      };
      return nextState || state;
    default:
      return state;
  }
}

export default settings;
