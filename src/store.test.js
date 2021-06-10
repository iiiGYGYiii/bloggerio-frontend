// STORE
import store from "./store";
// ACTION CREATORS
import { updateMessage } from "./reducers/Notification/notificationSlice";
import { initializeBlogs } from "./reducers/Blogs/blogsSlice";
// SERVICES
import { getBlogs } from "./services/blogService";

describe("STORE", () =>{
  describe("NOTIFICATION", ()=>{
    test("notification prop exist on store", () =>{
      const newState = store.getState();
      expect(newState.notification).toBeDefined();
    });
    describe("Action Creators", () =>{
      beforeEach(()=>{
        jest.useFakeTimers();
      });

      test("updateMessage clears message after 5s", () =>{
        const message = "This going to disappear";
        store.dispatch(updateMessage(message));
        const newState = store.getState().notification;
        expect(newState.message).toBe(message);
        expect(newState).toEqual({
          message,
          isBad: false
        });
        jest.runAllTimers();
        const newNewState = store.getState().notification;
        expect(newNewState.message).toBe("");
        expect(newNewState).toEqual({
          message: "",
          isBad: false
        });
      });
    });
  });

  describe("BLOGS", () =>{
    test("initBlogs action, initialize with database", async()=>{
      const state = store.getState().blogs;
      await store.dispatch(initializeBlogs);
      const newState = store.getState().blogs;
      const blogs = await getBlogs();
      expect(newState).not.toEqual(state);
      expect(newState).toEqual(blogs);
      expect(newState).toHaveLength(blogs.length);
    });

  });
});
