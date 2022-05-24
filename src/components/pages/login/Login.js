import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import * as config from '../../../config';
import {useNavigate } from 'react-router-dom';

function Login(props) {
  const navigate = useNavigate();

  const [SHOP_BIZNO, setCRNumber] = useState('');
  const [password, setPassword] = useState('');
 
  function loginHandler(e) {
    e.preventDefault();
    console.log('로그인 버튼 클릭');
    let data = {
      bizno : SHOP_BIZNO,
      password : password
    }
    try {
      axios.post(`${config.SERVER_URL}/api/login`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },

    })
      .then(res => {
        console.log(res.data == "");
        if(res.data !== "" && res.data !== null){
          console.log("res.data.accessToken : " , res.data);
          axios.defaults.headers.common['Authorization'] = 'Bearer' + res.data;
          props.loginCallBack(true);
          navigate("/");    
        }else{
          alert('일치하는 회원정보가 없습니다.')
        }
        
          
      })
      .catch(ex => {
        console.log("login request fail : " + ex);
        props.loginCallBack(false);
      })
      .finally(() => {console.log("login request end")});
    } catch (error) {
      console.log(error);
      props.loginCallBack(false);
      
    } 
  }

  useEffect(() => {
    console.log("Login Page render ....")
  })



    //input 입력창에 따른 변수값 저장 
    const handleChangeEmail = (e) => {
      setCRNumber(e.target.value)
    }

    const handleChangePW = (e) => {
      setPassword(e.target.value)
    }



    return (
      <Wrapper>
          {/* <Image src ={Soil_logo}>
          </Image> */}
          <Form>
             <Title>로그인</Title>

            <Input
                maxLength="20"
                type="email"
                name="crNumber"
                value={SHOP_BIZNO}
                placeholder="사업자등록번호"
                onChange={(e) => handleChangeEmail(e)}
            />
            <Input
                maxLength="20"
                type="password"
                name="password"
                value={password}
                placeholder="비밀번호"
                onChange={(e) => handleChangePW(e)}
            />
            <Button onClick={(e) => loginHandler(e)}>로그인 </Button>
        </Form>
      </Wrapper>
    );
}

export default Login;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background : '#123123';
  flex-direction : column;
  height : 100vh;
  
`;



const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0px 0px 8px 5px rgba(0, 0, 0, 0.1);
  padding : 50px;
  border-radius: 5px;
`;

const Input = styled.input`
  width : 200px;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #000;
  margin-bottom: 0.9rem;
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
`;

const Button = styled.button`
  border-radius: 4px;
  font-size : 15px;
  height : 35px;
  outline: 0;
  border: 0px solid rgba(1, 78, 136, 0.9);
  background-color : rgba(1, 78, 136, 0.9);
  color : rgba(255,255,255);
  font-weight : bold;

`


const Title = styled.div`
  font-size : 30px;
  color : rgba(1, 78, 136, 0.9);
  padding : 0px 0px 20px 0px;

`