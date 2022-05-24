import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import * as config from '../../../config';

const PasswordEdit = (props) => {
  const navigate = useNavigate();
    const [currentPW, setCurrentPW] = useState('');
    const [NewPW, setNewPW] = useState('');
    const [CheckPW, setCheckPW] = useState('');

  //input 입력창에 따른 변수값 저장 
    const ChangePW1 = (e) => {
      setCurrentPW(e.target.value)
    }

    const ChangePW2 = (e) => {
      setNewPW(e.target.value)
    }

    const ChangePW3 = (e) => {
        setCheckPW(e.target.value)
    }

    async function handleSubmit (e){
        e.preventDefault();
        // if(currentPW === ''){
        //     alert('현재 비밀번호를 입력해주세요.')
        //     return 
        // }

        if(NewPW === ''){
            alert('변경 비밀번호를 입력해주세요.')
            return 
        }

        if(CheckPW === ''){
            alert('변경 비밀번호 확인을 입력해주세요.')
            return
        }

        if(NewPW !== CheckPW){
            alert('변경 비밀번호가 일치하지 않습니다.')
        }


        const data = {
          currentPW : currentPW,
          NewPW : NewPW
        }

        try {
          axios.post(`${config.SERVER_URL}/api/passwordEdit`, JSON.stringify(data), {
            headers: {
              "Content-Type": `application/json`,
            },
        })
          .then(res => {
            if(res.data === 0){
              alert('비밀번호 변경오류 다시 시도해주세요.');
              window.location.reload();
            }else if(res.data === 1){
              alert('비밀번호 변경완료!');
              navigate("/");
            }else if(res.data === 2){
              alert('현재 비밀번호가 일치하지 않습니다.')
            }else{
              alert('다시 로그인 해주세요.');
              props.loginCallBack(false);
              navigate("/login");
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


        // await axios.post(`${config.SERVER_URL}/api/login`, {
             
        // })
        //   .then(response => {
        //     if(response.data.result === true){            
        //             axios.post(`${config.SERVER_URL}/api/passwordEdit`, {
        //                 NewPW : NewPW,
                        
        //             }).then(response => {
        //                 if(response.data === 1){
        //                     alert('비밀번호 변경완료!')
        //                     navigate("/");
        //                 }else{
        //                   alert('변경실패')
        //                 }
        //             })

        //     }else {
        //         alert('현재 비밀번호가 일치하지 않습니다.')
        //         return
        //     }
        //   })
    }

    return (
        <Wrapper>
            <Form>
               <Title>비밀번호 수정</Title>
               <Contents>
             <Input
                maxLength="20"
                type="password"
                name="currentPW"
                placeholder="현재 비밀번호"
                onChange={(e) => ChangePW1(e)}
            />
            <Input
                maxLength="20"
                type="password"
                name="NewPW"
                placeholder="변경 비밀번호"
                onChange={(e) => ChangePW2(e)}
            />
            <Input
                maxLength="20"
                type="password"
                name="CheckPW"
                placeholder="변경 비밀번호 확인"
                onChange={(e) => ChangePW3(e)}
            />
            <Button onClick={(e) => handleSubmit(e)}>변경 </Button>
         
               </Contents>
            </Form>
        </Wrapper>
    );
};

export default PasswordEdit;

const Wrapper = styled.div`
  font-family : "BMDOHYEON";
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height : 100vh;
  

`
const Form = styled.div`
  border : 0px solid gray; 
  border-radius : 10px;
  box-shadow: 5px 5px 10px 0px gray;
  padding : 20px;
`

const Title = styled.div`
  font-size : 30px;
  color : rgba(1, 78, 136, 0.9);
  padding : 0px 0px 20px 0px;

`

const Contents = styled.div`
  margin-top : 20px;
  display : flex;
  flex-direction: column;
`


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
  border: 0px;
  background-color : rgba(1, 78, 136, 0.9);
  color : rgba(255,255,255);
  font-weight : bold;

`