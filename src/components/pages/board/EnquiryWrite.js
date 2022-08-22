import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import { refreshToken } from '../../auth/RefreshToken';


const EnquiryWitre = ({loginCallBack}) => {
  const inputRef = useRef([]);
  const navigate = useNavigate();


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, SetCategory] = useState('');

  useEffect(() => {
    try{
      refreshToken(loginCallBack);
    }catch(e){
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const enquiryWriter = () => {
    for(let i = 0; i<inputRef.current.length; i++){
      if(inputRef.current[i].value === ""){
        if(i === 0){
          alert(inputRef.current[i].name + "를 선택해주세요.");
        }else{
          alert(inputRef.current[i].name + "을 입력해주세요.");
        }
        inputRef.current[i].focus();
        return;
      }
    }


    const data = {
      TITLE : title,
      CONTENT : content,
      CATEGORY : category
    }
    try {
      axios.post(`${config.SERVER_URL}/api/enquiryWrite`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
    })
      .then(res => {
        const message = res.data.result;
        if(message === "TOKEN ERROR"){
          alert(message);
          navigate("/login")
        }
        if(message === "SUCCESS"){
          alert('문의글 등록완료');
          navigate("/enquiry/list");
        }
        if(message === "TOKEN EXPIRED"){
          alert("로그인 만료 다시 로그인해주세요.");
          navigate("/login")
        }
        if(message === "TOKEN NULL"){
          navigate("/login");
        }
        if(message === "INSERT ERROR"){
          alert("다시 시도해주세요.");
          window.location.reload();
        }
          
      })
      .catch(ex => {
        console.log("login request fail : " + ex);
      })
      .finally(() => {
        });
    } catch (error) {
      console.log(error);
      
    } 
  }

  const handleSelect = (e) => {
    SetCategory(e.target.value);
  }
  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleContent = (e) => {
    setContent(e.target.value);
  }

    return (
        <Wrapper>
            <Form>
               <Title>문의글 작성</Title>
               <Contents>
               <Select name="문의 종류" onChange={handleSelect} value={category} ref={el => (inputRef.current[0] = el)}>
                    <option style={{display : 'none', color : 'grey'}} value=''>문의 종류</option>
                    <option value="문의1">문의1</option>
                    <option value="문의2">문의2</option>
                    <option value="문의3">문의3</option>
                  </Select>   
                  <label>문의 제목</label>              
                  <Input
                    ref = {el => (inputRef.current[1] = el)}
                    maxLength="20"
                    name="문의 제목"
                    placeholder="제목을 입력해주세요."
                    onChange={handleTitle}
                  />
                  <label>문의 내용</label>
                  <TextArea
                      ref = {el => (inputRef.current[2] = el)}
                      maxLength="500"
                      name="문의 내용"
                      placeholder="내용을 입력해주세요."
                      onChange={handleContent}
                  />
                    <div style={{width : '100%', textAlign : 'end' , marginTop : '10px'}}> 
                    <Button style={{backgroundColor : '#714DDA' }} onClick={enquiryWriter} >작성</Button>
                    <Button style={{ backgroundColor : 'rgba(150, 150, 150, 0.9)'}} onClick={()=> navigate('/enquiry/list')}>취소</Button>
                   </div>
                </Contents>
            </Form>
        </Wrapper>
    );
};

export default EnquiryWitre;

const Wrapper = styled.div`
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

  label {
    margin-top : 10px;
    margin-bottom : 3px;
    font-size : 17px;

  }
`

const Input = styled.input`
  height : 10px;
  width : 250px;

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



const Button = styled.button`
  max-width : 50px;
  margin-left : 5px;
  margin-right : 5px;
  height : 25px;
  align-self: flex-end;

  border-radius: 4px;
  font-size : 15px;
  outline: 0;
  border: 0px ;
  background-color : #714DDA;
  color : rgba(255,255,255);

  &:hover {
    cursor:pointer;
  }
`

const TextArea = styled.textarea`
  height : 10px;
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
  min-width : 300px;
  height : 200px;
  font-family: inherit;
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
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  font-family: inherit;
  width : 100px;
`