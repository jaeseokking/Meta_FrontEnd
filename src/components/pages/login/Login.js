import axios from 'axios';
import React, {useState, useRef} from 'react';
import styled from "styled-components";
import * as config from '../../../config';
import {useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Login(props) {
  const cookie = new Cookies();
  const inputRef = useRef([]);
  const navigate = useNavigate();

  const [SHOP_BIZNO, setCRNumber] = useState('');
  const [password, setPassword] = useState('');
 
  function loginHandler(e) {
    e.preventDefault();
    
    if(SHOP_BIZNO === ''){
      alert('사업자등록번호를 입력해주세요.')
      inputRef.current[0].focus();
      return;
    }

    if(password === ''){
      alert('비밀번호를 입력해주세요.')
      inputRef.current[1].focus();
      return;
    }


    let data = {
      bizno : SHOP_BIZNO,
      password : password
    }
    try {
      axios.post(`${config.SERVER_URL}/api/login`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }

    })
      .then(res => {
        if(res.data.accessToken != null){
          axios.defaults.headers.common['Authorization'] = 'Bearer' + res.data.accessToken;
          props.loginCallBack(true, res.data.ROLE);
          cookie.set("BIZNO", res.data.BIZNO);
          navigate("/");    
        }else{
          alert('일치하는 회원정보가 없습니다.')
        }
        
          
      })
      .catch(ex => {
        console.log("login request fail : " + ex);
        props.loginCallBack(false, 0);
      })
      .finally(() => {});
    } catch (error) {
      console.log(error);
      props.loginCallBack(false, 0);
      
    } 
  }




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
                ref={el => (inputRef.current[0] = el)}
            />
            <Input
                maxLength="20"
                type="password"
                value={password}
                placeholder="비밀번호"
                onChange={(e) => handleChangePW(e)}
                ref={el => (inputRef.current[1] = el)}
            />
            <Button onClick={(e) => loginHandler(e)}>로그인 </Button>
        </Form>
      </Wrapper>
    );
}

export default Login;

const Wrapper = styled.section`
  font-family: 'SCDream_Bold';
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background : '#123123';
  flex-direction : column;
  height : 100vh;
  margin-left : -200px;
  margin-top : -50px;
  
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
  font-family: 'SCDream';
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
 font-family: 'SCDream_Bold';
  width : 100%;
  margin-left : 5px;
  margin-right : 5px;
  height : 30px;
  align-self: flex-end;

  border-radius: 4px;
  font-size : 18px;
  outline: 0;
  border: 0;
  background-color : #714DDA;
  color : rgba(255,255,255);
  cursor:pointer;
  transition : 0.3s;

  &:hover{
    font-size : 20px;
    border-radius: 5px;
    box-shadow: 1px 1px 3px 0px gray;

  }
`


const Title = styled.div`
  font-size : 30px;
  color : #714DDA;
  padding : 0px 0px 20px 0px;

`