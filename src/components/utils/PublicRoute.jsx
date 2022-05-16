import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//로그인을 하지 않았을 경우
function PublicRoute({component : Component, restricted,...rest}) {

    return (
        <Route
        {...rest}
        render={props =>
          sessionStorage.getItem('isAuth') && restricted ? (
            //로그인을 한 상태에서 못 들어가는 페이지 설정 
            <Redirect to="/" />
          ) : (
            //로그인을 한 상태에서 들어가는 페이지 설정 
            <Component {...props} />
          )
        }
      />
    );
}

export default PublicRoute;