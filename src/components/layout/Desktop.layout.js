import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { NavLink , useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import * as config from '../../config';
import TopLayout from './TopLayout';
import AlimTalk from '../../images/alimtalk.png';
import Stamp from '../../images/stamp.png'
import Template from '../../images/template.png';
import Setting from '../../images/setting.png';
import board from '../../images/board.png'
import AlimTalkWhite from '../../images/alimtalk_white.png';
import StampWhite from '../../images/stamp_white.png'
import TemplateWhite from '../../images/template_white.png';
import SettingWhite from '../../images/setting_white.png';
import boardWhite from '../../images/board_white.png'


const WEEKDAY = ['월요일' , '화요일' , '수요일', '목요일', '금요일' , '토요일', '일요일'];

const DesktopLayout = (props) =>{
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());
    const Bizno = cookies.get("BIZNO");

    const [menu, setMenu] = useState({
        menu1 : false,
        menu2 : false,
        menu3 : false,
        menu4 : false,
        // menu5 : false,
    })

    const toggleMenu = (e) => {
        if(e === 1){
            setMenu({menu1 : true});
        }else if(e === 2){
            setMenu({menu2 : true});
        }else if(e === 3){
            setMenu({menu3 : true});
        }else if(e === 4){
            setMenu({menu4 : true});
        }
        // else if(e === 5){
        //     setMenu({menu5 : true});
        // }
    }


    //분단위 시간 변화
    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return(() => clearInterval(id))
    }, [])

    useEffect(() => {
        const url = window.location.pathname;
        console.log(url.includes('template'));
        if(url.includes('alimtalk')){
            setMenu({...menu, menu1 : true})
        }else if(url.includes('stamp') === true){
            setMenu({...menu, menu2 : true});
        }else if(url.includes('template')){
            setMenu({...menu, menu3 : true});
        }else if(url.includes('info')){
            setMenu({...menu, menu4 : true})
        }
        // else if(url.includes('notice') || url.includes('enquiry')){
        //     setMenu({...menu, menu5 : true})
        // }
        console.log(menu);
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
                props.loginCallBack(false, 0);
                navigate("/login");    
                
            })
            .catch(ex => {
              console.log("login request fail : " + ex);
              props.loginCallBack(false, 0);
              cookies.remove('refresh_token');
              cookies.remove('BIZNO');
            })
            .finally(() => {});
          } catch (error) {
            console.log(error);
            props.loginCallBack(false, 0);
            cookies.remove('refresh_token');
            cookies.remove('BIZNO');

          } 
    }


    return (
        <>
        <Wrapper>
            <Menu>
                <div className='title-form'>
                    {/* <div className="title">
                    <NavLink style={{textDecoration : "none" ,color : "#555"}} to={"/"}>
                        <br/>
                        스탬프 관리
                    </NavLink>
                    </div> */}
                    <div className="subtitle">
                        {time.getFullYear()+"년"}<br/>
                        {time.getMonth() +"월"+time.getDate()+"일   "+ WEEKDAY[time.getDay() - 1]}<br/>
                        {time.getHours() >= 10 ? time.getHours() : "0" +time.getHours()}
                        {":"}
                        {time.getMinutes() >= 10 ? time.getMinutes() : "0"+time.getMinutes()}
                </div> 
                </div>
                <div onClick={()=>toggleMenu(1)} className={menu.menu1 ? "main-menu main-show" : "main-menu"}>
                    <div className="menu_name"><Img  className="stamp" style={{cursor : 'pointer'}} alert="x"  src={menu.menu1 ? AlimTalkWhite : AlimTalk}/>알림톡</div></div>
                        <div className={menu.menu1 ? "show-menu" : "hide-menu"} >
                            <NavLink
                            style={({isActive}) => ({color: isActive ? '#714DDA'  : 'grey', fontSize : isActive ? '17px' : '15px', textDecoration : "none", cursor : 'pointer'})}
                            to={"/alimtalk/send"}
                            >
                                <div className="sub_menu">알림톡 발송</div>
                            </NavLink>
                    
                    </div>
                <div onClick={()=>toggleMenu(2)} className={menu.menu2 ? "main-menu main-show" : "main-menu"}>
                    <div className="menu_name"><Img  className="stamp" style={{cursor : 'pointer'}} alert="x"  src={menu.menu2 ? StampWhite : Stamp}/>스탬프</div></div>
                    <div className={menu.menu2 ? "show-menu" : "hide-menu"} >
                        <NavLink
                        style={({isActive}) => ({color: isActive ? '#714DDA'  : 'grey', fontSize : isActive ? '17px' : '15px', textDecoration : "none", cursor : 'pointer'})}
                        to={"/stamp/setting"}
                        >
                            <div className="sub_menu">스탬프 설정</div>
                        </NavLink> 
                        <br/>
                        <NavLink
                        style={({isActive}) => ({color: isActive ? '#714DDA' : 'grey', fontSize : isActive ? '17px' : '15px',textDecoration : "none", cursor : 'pointer'})}
                        to={"/stamp/list"}
                        >
                            <div className="sub_menu">스탬프 조회</div>
                        </NavLink>
                        {/* <br/>
                        <NavLink
                        style={({isActive}) => ({color: isActive ? '#714DDA' : 'grey', fontSize : isActive ? '17px' : '15px',textDecoration : "none", cursor : 'pointer'})}
                        to={"/stamp/issuance"}
                        >
                            <div className="sub_menu">스탬프 발급</div>
                        </NavLink> */}
                        {/*<br/>
                         <NavLink
                        style={({isActive}) => ({color: isActive ? '#714DDA' : 'grey', fontSize : isActive ? '17px' : '15px',textDecoration : "none", cursor : 'pointer'})}
                        to={"/stamp/resend"}
                        >
                            <div>스탬프 재발송</div>
                        </NavLink> */}

                </div>
                <div onClick={()=>toggleMenu(3)} className={menu.menu3 ? "main-menu main-show" : "main-menu"}>
                    <div className="menu_name">
                    <Img className="template" style={{cursor : 'pointer'}} alert="x"  src={menu.menu3 ? TemplateWhite : Template}/>  
                        탬플릿
                    </div>
                </div>
                    <div className={menu.menu3 ? "show-menu" : "hide-menu"} >
                        {props.role === 2 ? <>                        
                        <NavLink
                        style={({isActive}) => ({color: isActive ? '#714DDA' : 'grey', fontSize : isActive ? '17px' : '15px',textDecoration : "none", cursor : 'pointer'})}
                        to={"/account/list"}
                        >
                            <div className="sub_menu">계정 관리</div>
                        </NavLink>
                        <br/>
                        </>
                        :
                        null
                        }
                        <NavLink
                        style={({isActive}) => ({color: isActive ? '#714DDA' : 'grey', fontSize : isActive ? '17px' : '15px',textDecoration : "none", cursor : 'pointer'})}
                        to={"/template/manager"}
                        >
                            <div className="sub_menu">탬플릿 등록</div>
                        </NavLink>
                        <br/>
                        <NavLink
                        style={({isActive}) => ({color: isActive ? '#714DDA' : 'grey', fontSize : isActive ? '17px' : '15px',textDecoration : "none", cursor : 'pointer'})}
                        to={"/template/list"}
                        >
                            <div className="sub_menu">탬플릿 관리</div>
                        </NavLink>
                </div>
                <div onClick={()=>toggleMenu(4)} className={menu.menu4 ? "main-menu main-show" : "main-menu"}>
                    <div className="menu_name">
                    <Img className="setting" style={{cursor : 'pointer'}} alert="x"   src={menu.menu4 ? SettingWhite : Setting}/>  
                        기본설정
                    </div>
                </div>
                    <div className={menu.menu4 ? "show-menu" : "hide-menu"} >
                        <NavLink
                        style={({isActive}) => ({color: isActive ? '#714DDA' : 'grey', fontSize : isActive ? '17px' : '15px',textDecoration : "none", cursor : 'pointer'})}
                        to={"/info/shop/create"}
                        >
                            <div className="sub_menu">가맹점 추가</div>
                        </NavLink>
                        <br/>
                        <NavLink
                        style={({isActive}) => ({color: isActive ? '#714DDA' : 'grey', fontSize : isActive ? '17px' : '15px',textDecoration : "none", cursor : 'pointer'})}
                        to={"/info/shop/update"}
                        >
                            <div className="sub_menu">가맹점 수정</div>
                        </NavLink>
                        <br/>
                        <NavLink
                        style={({isActive}) => ({color: isActive ? '#714DDA' : 'grey', fontSize : isActive ? '17px' : '15px',textDecoration : "none", cursor : 'pointer'})}
                        to={"/info/edit"}
                        >
                            <div className="sub_menu">비밀번호 수정</div>
                        </NavLink>
                </div>
                {/* <div onClick={()=>toggleMenu(5)} className={menu.menu5 ? "main-menu main-show" : "main-menu"}>
                    <div className="menu_name">
                    <Img className="board" style={{cursor : 'pointer'}} alert="x"   src={menu.menu5 ? boardWhite : board}/>  
                        게시판
                    </div>
                </div>
                    <div className={menu.menu5 ? "show-menu" : "hide-menu"} >
                    <NavLink
                        style={({isActive}) => ({color: isActive ? '#714DDA' : 'grey', fontSize : isActive ? '17px' : '15px',textDecoration : "none", cursor : 'pointer'})}
                        to={"/notice/list"}
                        >
                            <div className="sub_menu">공지사항</div>
                        </NavLink>
                            <br/>
                        <NavLink
                        style={({isActive}) => ({color: isActive ? '#714DDA' : 'grey', fontSize : isActive ? '17px' : '15px',textDecoration : "none", cursor : 'pointer'})}
                        to={"/enquiry/list"}
                        >
                            <div className="sub_menu">1:1문의</div>
                        </NavLink>
                </div> */}
                
            </Menu>
           
        </Wrapper>
         <TopMenu>
         <div className="top_container">
             <div className="left_menu">   
                <NavLink style={{textDecoration : "none" ,color : "#fff"}} to={"/"}>
                    관리자 페이지
                </NavLink></div>
             <div className="right_menu">
                 <div className="main-menu bizno" style={{cursor : 'pointer'}}>{Bizno}</div>
                 <Button onClick={() => logout()} className="main-menu logout" style={{cursor : 'pointer'}}>로그아웃</Button>
             </div>
         </div>
     </TopMenu>
     </>
    );
}

export default DesktopLayout;


const Wrapper = styled.div`
  font-family: 'SCDream_Bold';
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  position: -webkit-sticky; /* 사파리 브라우저 지원 */
  position: fixed;




  


  .main-menu {
      font-size : 20px;
      cursor: pointer;
      
  }


  .subtitle {
    font-size : 15px;
    color : black;
    margin-bottom: 20px;
    margin-left : 20px;
  }

  .title-form{
      margin-bottom : 20px;
  }
`

const Menu = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    min-height : 100vh;
    background-color: #E9ECF3;
    padding : 20px 0 0 0px;
    margin-top : 80px;


  .main-menu{
    height : 40px;
    line-height: 40px;
    border-radius: 10px;
    border-right: -20px;
    margin-bottom : 10px;
    padding : 0px 0px 0px 10px; 
    margin-right : 20px;
    margin-left : 20px;
  }

  .menu_name {
  }

  .main-menu:hover{
    background-color: #714DDA;
    color : white;
    transition : 0.2s;
    box-shadow: 2px 2px 5px 0px gray;


  }

  .stamp:hover {
    src: StampWhite; 
  }

    .show-menu{
        height: 100%;
        transition: 0.2s;
        margin-top : 2px;
        margin-bottom : 10px;
        margin-left : 40px;
    
    }

    
    .hide-menu{
        height: 100%;
        position : absolute;
        left : -200px;
    }

    .main-show {
        background-color: #714DDA;
        color: white;
        box-shadow: 2px 2px 5px 0px gray;


    }

    .sub_menu:hover {
        color : #714DDA;
        font-size : 17px;
        transition : 0.2s;
    }

   
`

const TopMenu = styled.div`
    font-family : "SCDream";
    width : 100%;
    position: fixed;
    top : 0;
    line-height: 80px;
    height : fit-content;
    z-index: 10;


    .top_container {
        background-color: white;
        height : 80px;
        margin-right : 1px;
        background-color: #252643;


    }

    .left_menu{
        float : left;
        margin-left : 30px;
        font-family: 'SCDream_Bold';
        color : white;
        font-size: 20px;
    }

    .right_menu {
        line-height: 40px;
        float : right;
        margin-right : 20px;
        font-family: 'SCDream_Bold';
        color : white;
        flex-direction : column;
        text-align: center;

        .bizno {
            font-size : 5px;
            border-radius: 5px;
            background-color: #E9ECF3;
            height : 20px;
            line-height: 20px;
            margin-top : 10px;
            color : #252643;

        }
    }

`

const Img = styled.img`
    width :20px;
    vertical-align: middle;
    margin-right : 8px;
`

const Button = styled.button`
  font-family: 'SCDream_Bold';
  margin-top : 10px;
  height : 30px;
  border-radius: 4px;
  font-size : 20px;
  outline: 0;
  border: 0;
  background : transparent;
  
  color : rgba(255,255,255);
  cursor:pointer;
  transition : 0.3s;

  &:hover{
    background-color : #714DDA;
  }

`
