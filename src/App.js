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
import { refreshToken } from './components/auth/RefreshToken';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import RolePrivateRoute from './components/auth/RolePrivateRoute';
import Cookies from 'universal-cookie';
import NoticeList from './components/pages/board/NoticeList';
import StampDetail from './components/pages/stamps/StampDetail';
import NoticeDetail from './components/pages/board/NoticeDetail';
import EnquiryList from './components/pages/board/EnquiryList';
import EnquiryDetail from './components/pages/board/EnquiryDetail';
import EnquiryWrite from './components/pages/board/EnquiryWrite';
import EnquiryUpdate from './components/pages/board/EnquiryUpdate';
import StampIssuance from './components/pages/stamps/StampIssuance';
import StampResend from './components/pages/stamps/StampResend';
import TemplateManager from './components/pages/template/TemplateManager';
import TemplateList from './components/pages/template/TemplateList';
import TemplateMessage from './components/pages/template/TemplateMessage';
import AccountManager from './components/pages/template/AccountList';
import AccountCreate from './components/pages/template/AccountCreate';
import TemplateUpdate from './components/pages/template/TemplateUpdate';
import ShopUpdate from './components/pages/template/ShopUpdate';
import ShopCreate from './components/pages/template/ShopCreate';


function App(props) {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState(1); //1 일반 , 2 관리자
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  let token = cookies.get("refresh_token");
  
 
  useEffect(() => {
    try{
      refreshToken(loginCallBack);
    }catch(e){
      console.log(e);
    }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  function loginCallBack(login, role){
    setIsLogin(login);
    setRole(role);
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
              <ResponsiveLayout className="RL" loginCallBack={loginCallBack} isLogin={isLogin} role={role}/> : null
            }
            <Routes>
                <Route exact path="/" element={<PrivateRoute authenticated={isLogin}  component={<Home loginCallBack={loginCallBack}/>}/>}/>
                <Route exact path="/login" element={<PublicRoute authenticated={isLogin} component={<Login loginCallBack={loginCallBack}/>}/>}/>
                <Route exact path="/stamp/setting" element={<PrivateRoute authenticated={isLogin}  component={<StampSetting loginCallBack={loginCallBack}/>}/>}/>
                <Route exact path="/stamp/list" element={<PrivateRoute authenticated={isLogin} component={<StampList loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/stamp/issuance" element={<PrivateRoute authenticated={isLogin} component={<StampIssuance loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/stamp/detail" element={<PrivateRoute authenticated={isLogin} component={<StampDetail loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/stamp/resend" element={<PrivateRoute authenticated={isLogin} component={<StampResend loginCallBack={loginCallBack}/>}/>}/>
                <Route exact path="/info/edit" element={<PrivateRoute authenticated={isLogin} component={<PasswordEdit loginCallBack={loginCallBack}/>}/>}/>
                <Route exact path="/notice/list" element={<PrivateRoute authenticated={isLogin} component={<NoticeList loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/notice/detail" element={<PrivateRoute authenticated={isLogin} component={<NoticeDetail loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/enquiry/list" element={<PrivateRoute authenticated={isLogin} component={<EnquiryList loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/enquiry/detail" element={<PrivateRoute authenticated={isLogin} component={<EnquiryDetail loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/enquiry/write" element={<PrivateRoute authenticated={isLogin} component={<EnquiryWrite loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/enquiry/update" element={<PrivateRoute authenticated={isLogin} component={<EnquiryUpdate loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/template/manager" element={<PrivateRoute authenticated={isLogin} component={<TemplateManager loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/template/list" element={<PrivateRoute authenticated={isLogin} component={<TemplateList loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/account/list" element={<RolePrivateRoute authenticated={isLogin} role={role} component={<AccountManager loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/template/message" element={<PrivateRoute authenticated={isLogin} component={<TemplateMessage loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/account/create" element={<RolePrivateRoute authenticated={isLogin} role={role} component={<AccountCreate loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/template/update" element={<RolePrivateRoute authenticated={isLogin} role={role} component={<TemplateUpdate loginCallBack={loginCallBack}/>}/>}/>
                <Route path="/account/list" element={<RolePrivateRoute authenticated={isLogin} role={role} component={<AccountManager loginCallBack={loginCallBack}/>}/>}/>
                <Route path="account/shop/update" element={<RolePrivateRoute authenticated={isLogin} role={role} component={<ShopUpdate loginCallBack={loginCallBack}/>}/>}/>
                <Route path="account/shop/create" element={<RolePrivateRoute authenticated={isLogin} role={role} component={<ShopCreate loginCallBack={loginCallBack}/>}/>}/>
            </Routes> 
           </Center>
  
      </>
    );
  }else{
    return (
      null
    )
  }
 
}
export default App;
