import axios from "axios";
const URI = "";

let token = null;

const setToken = newToken => token = `bearer ${newToken}`;

const getBlogs = async () => {
  try {
    const res = await axios.get(URI+"/api/blogs");
    return res.data;
  } catch (error) {
    console.log("There was an error", error.message);
  }

};

const createBlog = async(data) => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  try {
    const res = await axios.post(URI+"/api/blogs", data, config);
    return res.data;
  } catch (error) {
    return;
  }
};

const logIn = async (data) => {
  try {
    const res = await axios.post(URI+"/api/login", data);
    setToken(res.data.token);
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

const updateLikes = async(ID, likes) => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  const data = {
    likes:likes+1
  };

  try{
    await axios.patch(URI+"/api/blogs/"+ID, data, config);
  }catch(error){
    console.log("There ocurred an error while Liking a post", error.message);
  }
};

const deleteBlogService = async ID => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  try {
    await axios.delete(URI+"/api/blogs/"+ID, config);
  } catch (error) {
    console.log(error.message);
  }
};

const commentBlog = async (blogId, comment) =>{
  const config = {
    headers: {
      Authorization: token
    }
  };
  try{
    const commentAdded = await axios.post(`${URI}/api/blogs/${blogId}/comment`, comment, config);
    return commentAdded;
  }catch(error){
    return;
  }
}

export {
  getBlogs,
  createBlog,
  logIn,
  setToken,
  updateLikes,
  deleteBlogService,
  commentBlog
};
