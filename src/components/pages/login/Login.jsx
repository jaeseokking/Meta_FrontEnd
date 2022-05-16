import axios from 'axios';
import React, {useState} from 'react';
import styled from "styled-components";
import { useHistory } from 'react-router';
import Soil_logo from '../../../images/soil_logo.png'
import * as config from '../../../config'


function Login() {
  let history = useHistory();
  // const alert = useAlert();
  
  async function login() {
    await axios.post(`${config.SERVER_URL}/api/login`, {
        SHOP_BIZNO : SHOP_BIZNO ,
        PASSWORD: password 
    })
      .then(response => {
        if(response.data.result === true){
          sessionStorage.setItem('isAuth', true);
          sessionStorage.setItem('SHOP_BIZNO', response.data.MEMBER_BIZNO);
          console.log(sessionStorage.getItem('SHOP_BIZNO'))
          if(SHOP_BIZNO === password){
            history.push('/update')
            alert('비밀번호를 변경해주세요.')
          }else{
            history.push('/')
            alert(`${SHOP_BIZNO}님 안녕하세요.`)
          }
        }else{
          alert('사업자번호와 패스워드를 확인해주세요.')
          return
        }
      })
  }
   const [SHOP_BIZNO, setCRNumber] = useState('');
   const [password, setPassword] = useState('');


    //input 입력창에 따른 변수값 저장 
    const handleChangeEmail = (e) => {
      setCRNumber(e.target.value)
    }

    const handleChangePW = (e) => {
      setPassword(e.target.value)
    }


    const handleSubmit = e => {
      e.preventDefault();

      login()
       

    }





    return (
      <Wrapper>
          <Image src ={Soil_logo}>
          </Image>
          <Form>
          <div style={{marginBottom : 20 , alignItems : 'center', fontSize : 25}}>세차권 로그인 </div>

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
            <Button onClick={(e) => handleSubmit(e)}>로그인 </Button>
            {/* <text>
              
              {data.MEMBER_ID}
            </text> */}
        </Form>
      </Wrapper>
    );
}

export default Login;

const Image = styled.img`
    width : 300px;
    margin-bottom : 20px;
`


const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-top : 100px;
  background : '#123123';
  flex-direction : column;
  
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
  border: 0px solid rgba(15, 122, 64, 0.9);
  background-color : rgba(15, 122, 64, 0.9);
  color : rgba(255,255,255);
  font-weight : bold;

`