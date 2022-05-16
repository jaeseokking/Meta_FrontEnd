import React, {useState} from 'react';
import styled from "styled-components";
import { NavLink , useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import * as config from '../../config';


const DesktopLayout = (props) =>{
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const toggleMenu = (e) => {
  
        if(e === 1){
            setOpen1(open1 => !open1);
        }else if(e === 2){
            setOpen2(open2 => !open2);
        }else if(e === 3){
            setOpen3(open3 => !open3);
        }
    }

    const logout = () => {

        try {
            axios.post(`${config.SERVER_URL}/api/logout`, {}, {
              headers: {
                "Content-Type": `application/json`,
              },
              xhrFields: {
                withCredentials: true
              },
          })
            .then(res => {
                navigate("/login");    
                props.loginCallBack(false);
                cookies.remove('refresh_token');
            })
            .catch(ex => {
              console.log("login request fail : " + ex);
              props.loginCallBack(false);
              cookies.remove('refresh_token');

            })
            .finally(() => {console.log("login request end")});
          } catch (error) {
            console.log(error);
            props.loginCallBack(false);
            cookies.remove('refresh_token');

          } 
    }



    return (
        <Side>
            <Menu>
                <div onClick={()=>toggleMenu(1)} className="main-menu">스탬프</div>
                    <div className={open1 ? "show-menu" : "hide-menu"} >
                        <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey'})}
                        to={"/stamp/setting"}
                        >
                            <div>스탬프 관리</div>
                        </NavLink>
                        <br/>
                        <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey'})}
                        to={"/stamp/list"}
                        >
                            <div>스탬프 조회</div>
                        </NavLink>
                </div>
                <div onClick={()=>toggleMenu(2)} className="main-menu">기본설정</div>
                    <div className={open2 ? "show-menu" : "hide-menu"} >
                        <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey'})}
                        to={"/info/edit"}
                        >
                            <div>비밀번호 수정</div>
                        </NavLink>
                </div>
                <div onClick={()=>toggleMenu(3)} className="main-menu">게시판</div>
                    <div className={open3 ? "show-menu" : "hide-menu"} >
                    <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey'})}
                        to={"/notice/list"}
                        >
                            <div>공지사항</div>
                        </NavLink>
                            <br/>
                        <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey'})}
                        to={"/question/list"}
                        >
                            <div>1:1문의</div>
                        </NavLink>
                </div>
                <div onClick={() => logout()} className="main-menu">로그아웃</div>
            </Menu>
        </Side>
    );
}

export default DesktopLayout;


const Side = styled.div`
  font-family : "BMDOHYEON";
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height : 100vh;

  .main-menu {
      font-size : 20px;
      margin-bottom : 10px;
  }
`

// const Profile = styled.img`
//   width: 150px;
//   height: 150px;
//   border-radius: 100%;
// `

const Menu = styled.div`
    margin-top: 30px;
    width: 200px;
    display: flex;
    flex-direction: column;

  .main-menu{
    width : 200px;
    margin-left : 20px;
  }

.show-menu{
    height: 100%;
    transition: 1s;
    margin-left : 40px;
    margin-top : 2px;
    margin-bottom : 10px;
    
}
    
.hide-menu{
    height: 100%;
    display : none;
    position : absolute;
    transition : 1s;
}
`


