import axios from 'axios';
import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import * as config from '../../config';

export const refreshToken = function(callback){
    const cookies = new Cookies();

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
          if(res.data == null || res.data == ""){
            callback(false);
            return;
          }
          //console.log("res.data.accessToken : " + res.data);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data;
          callback(true);
          
        })
        .catch(ex=>{
            console.log("app silent request fail : " + ex);
            if(callback){
                callback(false);
            }

        })
        .finally(()=>{
          console.log("login request end");
        });
    }catch(e){
        console.log(e);
        callback(false);
    }
}