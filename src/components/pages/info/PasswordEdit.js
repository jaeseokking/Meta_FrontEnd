import axios from 'axios';
import React, {useState, useRef} from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import * as config from '../../../config';


const PasswordEdit = (props) => {
  const inputRef = useRef([]);
  const navigate = useNavigate();
    const [currentPW, setCurrentPW] = useState('');
    const [NewPW, setNewPW] = useState('');
    const [CheckPW, setCheckPW] = useState('');
    const [resLoading, setResLoading] = useState(true);

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
        setResLoading(false);
        if(window.confirm("비밀번호를 수정하시겠습니까?") === false){
          setResLoading(true);
          return;
        }
        setTimeout(() => {editPW()}, 500)


        function editPW(){
          if(currentPW === ''){
            alert('현재 비밀번호를 입력해주세요.')
            inputRef.current[0].focus();
            return 
        }

        if(NewPW === ''){
            alert('변경 비밀번호를 입력해주세요.')
            inputRef.current[1].focus();
            return 
        }

        if(CheckPW === ''){
            alert('변경 비밀번호 확인을 입력해주세요.')
            inputRef.current[2].focus();
            return
        }

        if(NewPW !== CheckPW){
            alert('변경 비밀번호가 일치하지 않습니다.')
            inputRef.current[2].focus();
            return;
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
              inputRef.current[0].focus();
            }else{
              alert('다시 로그인 해주세요.');
              props.loginCallBack(false, 0);
              navigate("/login");
            }
            
              
          })
          .catch(ex => {
            console.log("login request fail : " + ex);
            props.loginCallBack(false, 0);
          })
          .finally(() => {
       
          });
        } catch (error) {
          console.log(error);
          props.loginCallBack(false, 0);
          
        } 
        }

       
    }

    return (
        <Wrapper>
            <Form>
               <Title>비밀번호 수정</Title>
               <Contents>
             <Input
                ref={el => (inputRef.current[0] = el)}
                maxLength="20"
                type="password"
                name="currentPW"
                placeholder="현재 비밀번호"
                onChange={(e) => ChangePW1(e)}
            />
            <Input
                ref={el => (inputRef.current[1] = el)}
                maxLength="20"
                type="password"
                name="NewPW"
                placeholder="변경 비밀번호"
                onChange={(e) => ChangePW2(e)}
            />
            <Input
                ref={el => (inputRef.current[2] = el)}
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
  font-family: 'SCDream';
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width : 100%;
  padding-left: 50px;
  padding-top : 80px;
  

`
const Form = styled.div`
  border : 0px solid gray; 
  border-radius : 10px;
  box-shadow: 5px 5px 10px 0px gray;
  padding : 40px;
`

const Title = styled.div`
  font-size : 30px;
  color : #714DDA;
  font-weight: 800;

`

const Contents = styled.div`
  margin-top : 20px;
  display : flex;
  flex-direction: column;
`


const Input = styled.input`
  width : 400px;
  height : 30px;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #000;
  margin-bottom: 2rem;
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
  margin-top : 10px;
  width : 100%;
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
    height : 40px;
    font-size : 22px;
    border-radius: 5px;
  }



`
