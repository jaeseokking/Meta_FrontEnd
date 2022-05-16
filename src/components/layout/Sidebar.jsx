import React, {useEffect, useState} from "react";
import styled from 'styled-components'
import {Link, useHistory} from "react-router-dom";
import Image from '../../images/s-oil.png'
import Logoutimg from '../../images/logout.png'
import Homeimg from '../../images/home.png';
import Listimg from '../../images/list.png';
import Passwordimage from '../../images/password_change.png'


function Sidebar(props, {defaultActive}) {

    const SidebarItems = [
      {
        name: "홈",
        route: `/`,
        address : '/',
        image : Homeimg
      },
      {
          name: "세차권 확인",
          route: `/cw_list`,
          address : '/cw_list',
          image : Listimg
      },
      {
          name: "비밀번호 변경",
          route: '/update',
          address : '/update',
          image : Passwordimage
    
      },
    
    ];

    const history = useHistory();
    const location = props.history.location;
    const lastActiveIndexString = sessionStorage.getItem("lastActiveIndex");
    const lastActiveIndex = Number(lastActiveIndexString);
    const [activeIndex, setActiveIndex] = useState(lastActiveIndex || defaultActive);





    function changeActiveIndex(newIndex) {
        sessionStorage.setItem("lastActiveIndex", newIndex)
        setActiveIndex(newIndex)
    }



    function getPath(path) {
        if (path.charAt(0) !== "/") {
            return  "/" + path;
        }
        return path;
    }

    useEffect(()=> {
        const activeItem = SidebarItems.findIndex(item=> getPath(item.address) === getPath(location.pathname))
        changeActiveIndex(activeItem);
    }, [location])

    function logout(){
      sessionStorage.removeItem("isAuth")
      history.push('/login');
      
    }

    return (
        <>
            <SidebarParent>
                <div style={{position: 'fixed'}}>
                  <Img src ={Image}/>
                  
                    {/* <SidebarItem style={{fontSize : 25, color : "rgb(255,255,255)"}}>{shop_bizno}님</SidebarItem> */}
                    <Link to = "/login">
                      <SidebarItem key= "로그아웃"
                      >
                        
                        <p onClick={() => logout()}><Icon src={Logoutimg}/>로그아웃</p>
                      </SidebarItem>
                    </Link>
                    {
                    
                        SidebarItems.map((item, index)=> {
                            return (
                                <Link to={item.route} 
                                key={item.route}
                                >
                                    <SidebarItem key={item.route}
                                                 active={index === activeIndex}
                                    >
                                        <p onClick={item.name === '로그아웃' ? () => logout() : null}><Icon src={item.image}/>{item.name}</p>
                                    </SidebarItem>
                                </Link>
                            );
                        })
                    }
                </div>
                <div className="behind-the-scenes"/>
            </SidebarParent>
        </>
    );
}

export default Sidebar;

const SidebarParent = styled.div`
  background: rgba(47, 47, 47, 0.9);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  a {
    text-decoration: none;
  }
  
  & > div {
    height: 100vh;
  }
  
  .behind-the-scenes {
    width: 250px;
    
  }

`;

const SidebarItem = styled.div`
  background: ${props => props.active ? "rgba(28, 200, 93, 1)" : ""};
  margin: 10px 30px;
  border-radius: 4px;
  padding : 2px;
  display: flex;


  p {
    color: white;
    font-weight: bold;
    text-decoration: none;
    margin-left : 7px;
  }
  
  &:hover {
    cursor:pointer;
  }
  

`;

const Img = styled.img`
  margin: 20px 50px;
  width : 150px;
  height : 150px;
  border-radius: 150px;

`

const Icon = styled.img`
  width : 20px;
  margin-left : 7px;
  margin-right : 10px;

`
