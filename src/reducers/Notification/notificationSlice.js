const initialState = {
  message: "",
  isBad: false
};

const notificationReducer = (state=initialState, action)=>{
  switch (action.type) {
    case "notification/ADD_MESSAGE":
      return {
        ...state,
        message: action.payload
      };
    case "notification/CLEAR_MESSAGE":
      return {
        ...state,
        message: ""};
    case "notification/IS_BAD":
      return{
        ...state,
        isBad: true
      };
    case "notification/IS_NOT_BAD":
      return{
        ...state,
        isBad: false
      }
    default:
      return state;
  }
}

export const addMessageAction = payload => {
  return{
    type: "notification/ADD_MESSAGE",
    payload
  }
}

export const clearMessageAction = {
  type: "notification/CLEAR_MESSAGE"
};

export const messageIsBad = {
  type: "notification/IS_BAD"
};

export const messageIsNotBad = {
  type: "notification/IS_NOT_BAD"
}

let firstTime = true;
let oldTimeout;

export const updateMessage = (payload, isBad) => (dispatch, getState)=>{
  dispatch(addMessageAction(payload));
  isBad ? dispatch(messageIsBad) : dispatch(messageIsNotBad);
  const actualTimeout = setTimeout(()=>{
    dispatch(clearMessageAction)
  }, 5000)
  if (firstTime){
    firstTime = false;
    oldTimeout = actualTimeout;
  }
  if (oldTimeout!==actualTimeout){
    clearTimeout(oldTimeout);
    oldTimeout = actualTimeout;
  }
};

export default notificationReducer;
