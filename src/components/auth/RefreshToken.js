import axios from 'axios';
import * as config from '../../config';

export const refreshToken = (loginCallback) => {

    try{
        axios.post(`${config.SERVER_URL}/api/refreshToken` , {}, {
          headers: {
            "Content-Type": `application/json`,
          },
          xhrFields: {
            withCredentials: true
          },
        })
        .then(res =>{
          if(res === null || res === ""){
            loginCallback(false, 0);
            return;
          }
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken;
          loginCallback(true, res.data.ROLE);

        })
        .catch(ex=>{
            console.log("app silent request fail : " + ex);
            if(loginCallback){
              loginCallback(false, 0);
            }

        })
        .finally(()=>{
        });
    }catch(e){
        console.log(e);
        loginCallback(false, 0);
    }
}