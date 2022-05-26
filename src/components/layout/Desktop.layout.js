import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { NavLink , useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import * as config from '../../config';
const WEEKDAY = ['월요일' , '화요일' , '수요일', '목요일', '금요일' , '토요일', '일요일'];

const DesktopLayout = (props) =>{
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());

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

    //분단위 시간 변화
    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return(() => clearInterval(id))
    }, [])

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
                cookies.remove('refresh_token');
                props.loginCallBack(false);
                navigate("/login");    
                
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
        <Wrapper>
            <Menu>
                <div className='title-form'>
                    <div className="title">
                        METACITY<br/>
                        스탬프 관리
                    </div>
                    <div className="subtitle">
                        {time.getFullYear()+"년"}<br/>
                        {time.getMonth() +"월"+time.getDate()+"일   "+ WEEKDAY[time.getDay() - 1]}<br/>
                        {time.getHours() >= 10 ? time.getHours() : "0" +time.getHours()}
                        {":"}
                        {time.getMinutes() >= 10 ? time.getMinutes() : "0"+time.getMinutes()}
                </div> 
                </div>
                <div onClick={()=>toggleMenu(1)} className="main-menu">스탬프</div>
                    <div className={open1 ? "show-menu" : "hide-menu"} >
                        <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey', textDecoration : "none", cursor : 'pointer'})}
                        to={"/stamp/setting"}
                        >
                            <div>스탬프 관리</div>
                        </NavLink>
                        <br/>
                        <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey', textDecoration : "none", cursor : 'pointer'})}
                        to={"/stamp/list"}
                        >
                            <div>스탬프 조회</div>
                        </NavLink>
                </div>
                <div onClick={()=>toggleMenu(2)} className="main-menu">기본설정</div>
                    <div className={open2 ? "show-menu" : "hide-menu"} >
                        <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey', textDecoration : "none", cursor : 'pointer'})}
                        to={"/info/edit"}
                        >
                            <div>비밀번호 수정</div>
                        </NavLink>
                </div>
                <div onClick={()=>toggleMenu(3)} className="main-menu">게시판</div>
                    <div className={open3 ? "show-menu" : "hide-menu"} >
                    <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey', textDecoration : "none", cursor : 'pointer'})}
                        to={"/notice/list"}
                        >
                            <div>공지사항</div>
                        </NavLink>
                            <br/>
                        <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey', textDecoration : "none", cursor : 'pointer'})}
                        to={"/enquiry/list"}
                        >
                            <div>1:1문의</div>
                        </NavLink>
                </div>
                <div onClick={() => logout()} className="main-menu" style={{cursor : 'pointer'}}>로그아웃</div>
            </Menu>
        </Wrapper>
    );
}

export default DesktopLayout;


const Wrapper = styled.div`
  font-family : "BMDOHYEON";
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height : 100vh;

  .main-menu {
      font-size : 15px;
      margin-bottom : 20px;
      cursor: pointer;
  }

  .title {
      font-size : 25px;
      margin-left : 20px;
      color : #555;
      margin-bottom : 20px;
      margin-top : 20px;
  }

  .subtitle {
    font-size : 15px;
    margin-left : 20px;
    color : #888;
    margin-bottom: 20px;
  }

  .title-form{
      margin-bottom : 20px;
  }


`

// const Profile = styled.img`
//   width: 150px;
//   height: 150px;
//   border-radius: 100%;
// `

const Menu = styled.div`
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


