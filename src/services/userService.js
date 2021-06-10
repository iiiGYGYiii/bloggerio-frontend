import axios from 'axios';
const URI = "/api/users";

export const getUsers = async () =>{
  const users = await axios.get(URI);
  return users.data;
}

export const signUp = async ({ name, username, password}) =>{
  const createUser = {
    name, username, password
  };
  const response = await axios.post(URI, createUser);
  return response.data;
}

export const getUser = async id =>{
  const user = await axios.get(URI+"/"+id);
  return user.data
}
