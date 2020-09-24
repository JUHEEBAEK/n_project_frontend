import { singIn, join} from "../api/auth.js";

export const login = async (userId, password) => {
  try {
    let body = {
      userId: userId,
      password: password
    }
    const result = await singIn(body);
    if(result.response) {
      // err 일때 
      return result.response;
    }else {
      return result.data;
    }
  } catch (error) {
    return error;
  }
};

export const joinProcess = async (data) => {
  console.log("formData", data);
  try {
    const result = await join(data);
    console.log("join res: ", result);
    return result;
  }catch (error) {
    console.error(error);
    return error;
  }
};
