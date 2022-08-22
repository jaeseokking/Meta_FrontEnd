import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import alimTalk from '../../images/alimtalk_color.png';
import stamp from '../../images/stamp_color.png';
import template from '../../images/template_color.png';
import setting from '../../images/setting_color.png';

const Home = () => {
    return (

        <Wrapper>
            <Form>
                {/* <Title>메뉴 한눈에 보기</Title> */}
               <Menu>
                    <Title>
                        <img src={alimTalk} alt="alimTalk_img"></img>
                        <span>알림톡</span>
                    </Title>
                    <ul>
                        <li><NavLink to={"/alimtalk/send"}>알림톡 발송</NavLink></li>
                    </ul>
               </Menu>
               <Menu>
                    <Title>
                        <img src={stamp} alt="stamp_img"></img>
                        <span>스탬프</span>
                    </Title>
                    <ul>
                        <li><NavLink to={"/stamp/setting"}>스탬프 설정</NavLink></li>
                        <li><NavLink to={"/stamp/list"}>스탬프 조회</NavLink></li>
                    </ul>
               </Menu>
               <Menu>
                    <Title>
                        <img src={template} alt="template_img"></img>
                        <span>템플릿</span>
                    </Title>
                    <ul>
                        <li><NavLink to={"/template/manager"}>템플릿 등록</NavLink></li>
                        <li><NavLink to={"/template/list"}>템플릿 관리</NavLink></li>
                    </ul>
               </Menu>
               <Menu>
                    <Title>
                        <img src={setting} alt="setting_img"></img>
                        <span>기본설정</span>
                    </Title>
                    <ul>
                        <li><NavLink to={"/info/shop/create"}>가맹점 추가</NavLink></li>
                        <li><NavLink to={"/info/shop/update"}>가맹점 수정</NavLink></li>
                        <li><NavLink to={"/info/edit"}>비밀번호 수정</NavLink></li>
                    </ul>
               </Menu>
              

            </Form>
        </Wrapper>
    );
};

export default Home;


  

const Wrapper = styled.div`
  font-family: 'SCDream';
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width : 100%;
  padding-left: 0px;
  padding-top : 50px;
  

`
const Form = styled.div`
  border : 0px solid gray; 
  border-radius : 10px;
  padding : 40px;
  width : 1200px;
  background-color: white;
  
`

const Menu = styled.div`

  margin-top : 20px;
  width : 250px;
  height : fit-content;
  box-shadow: 5px 5px 10px 0px gray;
  float : left;
  border-radius : 15px;
  margin-right : 30px;
  text-align: center;

  ul {
    font-family: 'SCDream_SemiBold';
    font-size : 20px;
    list-style:none;
    padding-left: 0px;
    margin-top : 10px;
    padding-left : 75px;

    
    li {
        margin-bottom : 15px;
        width : fit-content;

        a{
            text-decoration : none;
            cursor : pointer;
            color : black;
            transition : 0.2s;
        }

        a:hover {
            color : #714DDA;
            font-size : 22px;

        }
    }
  }
  
`

const Title = styled.div`
  font-size : 25px;
  color : #252643;
  width : fit-content;
  height : 50px;
  line-height : 50px;
  font-family: 'SCDream_Bold'; 
  margin : 15px auto 0px auto;
  display: flex;
  align-items: center;


    img {
         width : 30px;
         height : 30px;
         display : inline-block;

    }
    span {
        margin-left : 5px;
        display : inline-block;

    }
  
  

`



const Input = styled.input`
  height : 10px;
  text-align: end;

  padding: 11px 13px;
  background: #f9f9fa;
  color: #000;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 15px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }


`

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 10px;
  font-family: 'SCDream';
  font-weight : 900;
  border-spacing: 0 0px;
  width : 100%;

  tbody th {
    padding : 25px;
    font-family: 'SCDream_Bold';

  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }



  th {
    background-color: #F5F2F4;
    border-bottom : 1px solid #888;
    width : 180px;
  }

  td{
    border-bottom : 1px solid #888;
    padding-left : 20px;
  }

  tr:last-child td:last-child{
    border-bottom : 0;
    text-align: center;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .checkbox {
    margin-left : 30px;
  }

  td:last-child{
    height : 50px;
  }


 
 
`

const Button = styled.button`
  font-family: 'SCDream_Bold';
  margin-top : 10px;
  width : 200px;
  margin-left : 5px;
  margin-right : 5px;
  height : 30px;
  align-self: flex-end;

  border-radius: 4px;
  font-size : 20px;
  outline: 0;
  border: 0;
  background-color : #714DDA;
  color : rgba(255,255,255);
  cursor:pointer;
  box-shadow: 1px 1px 3px 0px gray;
  transition : 0.3s;
  float : right;

  &:hover{
    width : 220px;
    height : 34px;
    font-size : 22px;
    border-radius: 5px;
  }



`


const Select = styled.select`
  height : 30px;
  background: #f9f9fa;
  border-radius: 4px;
  color: #000;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 15px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  font-family: inherit;
`
