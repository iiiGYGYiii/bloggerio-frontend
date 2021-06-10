import blogsReducer,{
  addBlog,
  delBlog as deleteBlog,
  initBlogs,
  likeBlogAction
} from "./blogsSlice";
import deepFreeze from "deep-freeze";

describe("Blogs Reducer", () =>{
  const initialState = [{
    id:0,
    author: "Tester1",
    title: "Testing1",
    url: "test.ing/1",
    likes: 0
  },{
    id: 1,
    author: "Tester2",
    title: "Testing2",
    url: "test.ing/2",
    likes: 1
  },{
    id: 2,
    author: "Tester3",
    title: "Testing3",
    url: "test.ing/3",
    likes: 2
  }];
  test("when state undefined returns proper state", () =>{
    const state = undefined;
    const newState = blogsReducer(state, { type: "NOTHING"});
    expect(newState).toBeDefined();
    expect(newState).toEqual([]);
  });

  describe("Blogs Actions", () =>{
    deepFreeze(initialState);
    test("blogs/ADD_BLOG returns new state", () =>{
      const newBlog = "This is a new blog";
      const newState = blogsReducer(initialState, addBlog(newBlog));
      expect(newState).toHaveLength(initialState.length+1);
      expect(newState).toContain(newBlog);
    });
    test("blogs/DELETE_BLOG returns a new state", ()=>{
      const newBlog = {
        id: 3,
        author: "Tester4",
        title: "Testing4",
        url: "test.ing/4",
        likes: 3
      };
      const state = blogsReducer(initialState, addBlog(newBlog));
      const newState = blogsReducer(state, deleteBlog(newBlog.id));
      expect(newState).toHaveLength(initialState.length);
      expect(newState).not.toContain(newBlog);
    });
    test("blogs/INITIALIZE creates state based on payload", () =>{
      const newState = blogsReducer(undefined, initBlogs(initialState));
      expect(newState).toEqual(initialState);
      expect(newState).toHaveLength(initialState.length);
    });
    test("blogs/LIKE_BLOG increment by 1 likes of a blog", () =>{
      const id = 2;
      const newState = blogsReducer(initialState, likeBlogAction(id));
      expect(newState).toHaveLength(initialState.length);
      const toUpdate = initialState.find(val=>val.id===id);
      const updatedBlog = newState.find(val => val.id===id);
      expect(updatedBlog).toEqual({
        ...toUpdate,
        likes: toUpdate.likes+1
      });
    });
  });
});
