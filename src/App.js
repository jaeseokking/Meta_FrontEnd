import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Home from './components/pages/Home';
import ResponsiveLayout from './components/layout/Responsive.layout';
import StampSetting from './components/pages/stamps/StampSetting';
import Center from './components/utils/Center';
import StampList from './components/pages/stamps/StampList';
import PasswordEdit from './components/pages/info/PasswordEdit';
import Login from './components/pages/login/Login';
import { refreshToken } from './components/utils/RefreshToken';
import PrivateRoute from './components/utils/PrivateRoute';
import PublicRoute from './components/utils/PublicRoute';
import Cookies from 'universal-cookie';
import NoticeList from './components/pages/board/NoticeList';
import StampDetail from './components/pages/stamps/StampDetail';







function App(props) {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  let token = cookies.get("refresh_token");
  
  useEffect(() => {
    try{
      refreshToken(loginCallBack);
    }catch(e){
      console.log(e);
    }
  }, []);


  function loginCallBack(login){
    setIsLogin(login);
    setLoading(true);
    if(login === false){
      navigate("/login");
    }
  }

  if(loading){
    return (
      <>
          <Center>
            {(isLogin === true  && ( token !== "" && token !== undefined)) ?
              <ResponsiveLayout loginCallBack={loginCallBack} isLogin={isLogin}/> : null
            }
            <Routes>
                <Route exact path="/" element={<PrivateRoute authenticated={isLogin}  component={<Home loginCallBack={loginCallBack}/>}/>}/>
                <Route exact path="/login" element={<PublicRoute authenticated={isLogin} component={<Login loginCallBack={loginCallBack}/>}/>}/>
                <Route exact path="/stamp/setting" element={<PrivateRoute authenticated={isLogin}  component={<StampSetting loginCallBack={loginCallBack}/>}/>}/>
                <Route exact path="/stamp/list" element={<PrivateRoute authenticated={isLogin} component={<StampList loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/stamp/detail" element={<PrivateRoute authenticated={isLogin} component={<StampDetail loginCallBack={loginCallBack}/>}/>}/>
                <Route exact path="/info/edit" element={<PrivateRoute authenticated={isLogin} component={<PasswordEdit loginCallBack={loginCallBack}/>}/>}/>
                <Route exact path="/notice/list" element={<PrivateRoute authenticated={isLogin} component={<NoticeList loginCallBack={loginCallBack}/>}/>}/>
            </Routes> 
           </Center>
  
      </>
    );
  }else{
    return (
      <div>
        Loading ...
      </div>
    )
  }
 
}
export default App;

