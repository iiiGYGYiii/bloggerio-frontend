import notificationReducer,{
  addMessageAction,
  clearMessageAction
} from "./notificationSlice";

describe("Notification Reducer", () =>{
  const initialState = {
    message: "",
    isBad: false
  };
  test("When state given undefined returns proper state", () =>{
    const state = undefined;
    const newState = notificationReducer(state, {type: "NOTHING"});
    expect(newState).toBeDefined();
    expect(newState).toEqual(initialState);
  });

  describe("Notification Actions", () =>{
    test("notification/ADD_MESSAGE updates to given message", ()=>{
      const state = "";
      const message = "This is a test message!";
      const newState = notificationReducer(state, addMessageAction(message));
      expect(newState.message).toBe(message);
    });

    test("notification/CLEAR_MESSAGE returns empty string", ()=>{
      const state = "This shouldn't be the newState";
      const newState = notificationReducer(state, clearMessageAction);
      expect(newState.message).not.toBe(state.message);
      expect(newState.message).toBe(initialState.message);
    });

    test("notification/IS_BAD change the boolean to true", () =>{
      const state = {
        message: "This is a bad message",
        isBad: false
      };
      const newState = notificationReducer(state, {
        type: "notification/IS_BAD"
      });
      expect(newState.isBad).toBeTruthy();
      expect(newState).toEqual({
        ...state,
        isBad: true
      });
    
    });

    test("notification/IS_NOT_BAD change the boolean to true", () =>{
      const state = {
        message: "This is a good message",
        isBad: true
      };
      const newState = notificationReducer(state, {
        type: "notification/IS_NOT_BAD"
      });
      expect(newState.isBad).toBeFalsy();
      expect(newState).toEqual({
        ...state,
        isBad: false
      });
    });
  });
});
