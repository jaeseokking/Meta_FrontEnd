import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import CalendarSetting from '../list/CalendarSetting';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import { refreshToken } from '../../auth/RefreshToken';
import { Values } from 'react-lodash';
import Spinner from 'react-spinkit';


const EnquiryWitre = ({loginCallBack}) => {
    
    
  const navigate = useNavigate();

  let getParameter = (key) => {
      return new URLSearchParams(window.location.search).get(key);
  }

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, SetCategory] = useState('');

  useEffect(() => {
    try{
      refreshToken(loginCallBack);
    }catch(e){
      console.log(e);
    }
  },[]);

  const enquiryWriter = () => {
    const data = {
      TITLE : title,
      CONTENT : content,
      CATEGORY : category
    }
    console.log(data);
    try {
      axios.post(`${config.SERVER_URL}/api/enquiryWrite`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
    })
      .then(res => {
        console.log(res.data.result);
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
          alert(message);
          navigate("/login")
        }
        if(message === "TOKEN NULL"){
          alert(message);
          navigate("/login");
        }
        if(message === "INSERT ERROR"){
          alert(message);
          window.location.reload();
        }
          
      })
      .catch(ex => {
        console.log("login request fail : " + ex);
      })
      .finally(() => {console.log("login request end")});
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
                  <Select onChange={handleSelect}>
                    <option style={{display : 'none', color : 'grey'}}>문의 종류</option>
                    <option value="문의1">문의1</option>
                    <option value="문의2">문의2</option>
                    <option value="문의3">문의3</option>
                  </Select>   
                  <label>문의 제목</label>              
                  <Input
                    maxLength="20"
                    name="title"
                    placeholder="제목을 입력해주세요."
                    onChange={handleTitle}
                  />
                  <label>문의 내용</label>
                  <TextArea
                      maxLength="500"
                      name="content"
                      placeholder="내용을 입력해주세요."
                      onChange={handleContent}
                  />
                    <div style={{width : '100%', textAlign : 'end' , marginTop : '10px'}}> 
                    <Button style={{backgroundColor : 'rgba(1, 78, 136, 0.9)' }} onClick={enquiryWriter} >작성</Button>
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
  color : rgba(1, 78, 136, 0.9);
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

const Table = styled.table`
  border: 0px;
  border-collapse: separate;
  border-spacing: 0 10px;

  tbody th {
    font-weight : 400;
    padding : 10px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
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
  border: 0px solid rgba(1, 78, 136, 0.9);
  background-color : rgba(1, 78, 136, 0.9);
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