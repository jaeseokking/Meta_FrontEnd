import React, {useState} from 'react';
import styled from "styled-components";
import {NavLink, useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import * as config from '../../config';
import hamberger from '../../images/hamberger.png'
import x from '../../images/x.png';

const MobileLayout = (props) => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [isOpen , setOpen] = useState(false);
    const [xPosition, setX] = useState(-202);

    const toggleOpen = () => {
        if(xPosition < 0){
            setX(0);
            setOpen(true);
        }else{
            setX(-202);
            setOpen(false);
        }
    }

    // const handleClose = async e => {
    //     let sideArea = side.current;
    //     let sideCildren = side.current.contains(e.target);
    //     if (isOpen && (!sideArea || !sideCildren)) {
    //       await setX(-280); 
    //       await setOpen(false);
    //     }
    //   }

    // useEffect(()=> {
    //     window.addEventListener('click', handleClose);
    //     return () => {
    //         window.removeEventListener('click', handleClose);
    //     };
    // })


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
        <Wrapper>
            <Side style={{width : "200px", height : '100%', transform : `translatex(${-xPosition}px)`}}>
            <Button onClick={() => toggleOpen()}>
                {isOpen ?
                   <Img alert="x" src={x}/> : <Img alert="hambergermenu" src={hamberger}/>  
                }
            </Button>
            
            <div onClick={()=>toggleMenu(1)} className="main-menu">스탬프</div>
                    <div className={open1 ? "show-menu" : "hide-menu"} >
                        <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey', textDecoration : "none",})}
                        to={"/stamp/setting"}
                        >
                            <div>스탬프 관리</div>
                        </NavLink>
                        <br/>
                        <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey', textDecoration : "none",})}
                        to={"/stamp/list"}
                        >
                            <div>스탬프 조회</div>
                        </NavLink>
                </div>
                <div onClick={()=>toggleMenu(2)} className="main-menu">기본설정</div>
                    <div className={open2 ? "show-menu" : "hide-menu"} >
                        <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey', textDecoration : "none",})}
                        to={"/info/edit"}
                        >
                            <div>비밀번호 수정</div>
                        </NavLink>
                </div>
                <div onClick={()=>toggleMenu(3)} className="main-menu">게시판</div>
                    <div className={open3 ? "show-menu" : "hide-menu"} >
                    <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey', textDecoration : "none", })}
                        to={"/notice/list"}
                        >
                            <div>공지사항</div>
                        </NavLink>
                            <br/>
                        <NavLink
                        style={({isActive}) => ({color: isActive ? 'black' : 'grey', textDecoration : "none",})}
                        to={"/enquiry/list"}
                        >
                            <div>1:1문의</div>
                        </NavLink>
                </div>
                <div onClick={() => logout()} className="main-menu">로그아웃</div>       
            </Side>
        </Wrapper>
    );
}

export default MobileLayout;



const Wrapper = styled.div`
  font-family : "BMDOHYEON";
  border-right: 1px solid #e0e0e0;
  width: 100vw;
  opacity: 10;
`

const Side = styled.div`
    background-color : white;
    position : fixed;
    top: 0;
    bottom: 0;
    right: 0;
    transition : 0.4s ease;
    color: #202020;
    height: 100%;
    z-index: 99;
    flex-direction: column;
    align-items: center;
    border-left: 2px  ;
    border-top: 2px ;
    border-bottom: 2px ;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    background-color : rgba(245, 245, 245, 0.9);


    .main-menu {
      font-size : 22px;
      margin-bottom : 20px;
      margin-left : 20px;
    }


    .show-menu{
        transition: 1s;
        margin-left : 40px;
        margin-top : 2px;
        margin-bottom : 10px;
    }
        
    .hide-menu{
        display : none;
        position : absolute;
        transition : 1s;
    }

`

const Button = styled.button`
    position : relative;
    left: -50px;
    top: 10px;
    width: 40px;
    height: 40px;
    z-index: 99;
    transition: 0.8s ease;
    border-radius: 20px;
    border : none;
    overflow: hidden;
`

const Img = styled.img`
    width : 20px;
`