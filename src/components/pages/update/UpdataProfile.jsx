import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router';
import * as config from '../../../config'


function UpdataProfile(props) {
    const shop_bizno = sessionStorage.getItem('SHOP_BIZNO');
    const [currentPW, setCurrentPW] = useState('');
    const [NewPW, setNewPW] = useState('');
    const [CheckPW, setCheckPW] = useState('');
    const history = useHistory();

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
        if(currentPW === ''){
            alert('현재 비밀번호를 입력해주세요.')
            return 
        }

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


        await axios.post(`${config.SERVER_URL}/api/login`, {
        
            SHOP_BIZNO : shop_bizno ,
            PASSWORD: currentPW 
        })
          .then(response => {
            if(response.data.result === true){            
                    axios.post(`${config.SERVER_URL}/api/update`, {
                        SHOP_BIZNO : shop_bizno,
                        NewPW : NewPW,
                        
                    }).then(response => {
                        if(response.data === 1){
                            alert('비밀번호 변경완료!')
                            history.push('/')
                        }else{
                          alert('변경실패')
                        }
                    })

            }else {
                alert('현재 비밀번호가 일치하지 않습니다.')
                return
            }
          })
    }

    return (
        <Wrapper>
            <Form>
          <div style={{marginBottom : 20 , alignItems : 'center', fontSize : 25}}>비밀번호 변경</div>
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
         
        </Form>
        </Wrapper>
    );
}

export default UpdataProfile;


const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
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