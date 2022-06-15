import {signInUserItem} from "../Types/userItem";
import axios from "axios";

class UserService{
    //Signin.tsx
    signIn(email : string | null, password: string | null){
        return axios.post<signInUserItem>(
        "http://localhost:8080/user/login",
        { 'email': email, 'password': password },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );
    }
}

export default new UserService();
