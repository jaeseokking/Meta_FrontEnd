import React, {useState, useEffect, useSyncExternalStore} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../auth/RefreshToken';
import Calendar from '../list/Calendar';
import axios from 'axios';
import * as config from '../../../config';
import {format} from 'date-fns';
import { useNavigate, useParams } from 'react-router';


const NoticeDetail = ({loginCallBack}) => {

    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    let getParameter = (key) => {
        return new URLSearchParams(window.location.search).get(key);
    }

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
      try{
        refreshToken(loginCallBack);
      }catch(e){
        console.log(e);
      }
    },[]);

    useEffect(() => {
      axios.post(`${config.SERVER_URL}/api/notice/detail`, {
        IDX : getParameter('idx'),
      }).then(response => {
        console.log('DATA' , response.data);
        if(response.data.result === 'NO DATA'){
          alert('접근권한이 없거나 없는 데이터입니다.');
          navigate('/notice/list')
        }
        if(response.data.result === 'SUCCESS'){
          console.log(response.data.noticeDetail)
          const detail = response.data.noticeDetail;
          setTitle(detail.TITLE);
          setContent(detail.CONTENT);
          setDate(detail.DATE);
          setLoading(true);
        }else{
          navigate('/login');
        }
      })
    }, [])


    if(loading === true){
      return (
        <Wrapper>
            <Form>
               <Title>공지사항</Title>
               <Contents>
                   <div className="title_container">
                    <div className="title">{title}</div>
                    <div className="subtitle">{format(date, 'yyyy.MM.dd')}</div>
                </div>
                    <div className="content">{content}</div>
               </Contents>
                <div style={{width : '100%', textAlign : 'end' , marginTop : '10px'}}> 
                <Button style={{ backgroundColor : 'rgba(150, 150, 150, 0.9)', marginRight : '30px'}} onClick={()=> navigate('/notice/list')}>확인</Button>
                </div>
            </Form>
        </Wrapper>
      );
    }else{
      return (
        <Wrapper>
            <Form>
            loading.....
            </Form>
        </Wrapper>
      )
    }

};

export default NoticeDetail;

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
  padding : 10px;
  max-width : 600px;
  width : 80%;
   
  @media screen and (max-width: 767px){
    width : 80%;
  }
`

const Title = styled.div`
  font-size : 30px;
  color : rgba(1, 78, 136, 0.9);
  font-weight: 800;

`

const Contents = styled.div`
  margin : 30px 30px 0px 30px;
  display : flex;
  flex-direction: column;
  border-radius: 5px;

  .title_container {
    border-bottom: 2px solid rgb(240,240,240);
  }

  .title {
      font-size:  30px;
      font-weight: 600;
      color : rgb(50,50,50);
      margin-bottom: 20px;

  }

  .subtitle{
      font-size : 15px;
      color : rgb(100,100,100);
      margin-bottom : 10px;

  }

  .content {
    padding : 10px;
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



const SearchForm = styled.div`
    display : flex;
    align-items: center;
    align-self : end;
    justify-content: center;
    width : '100%';
  
    @media screen and (max-width: 767px){
        display: inline-block;
        align-items: center;
        align-self : end;
        justify-content: flex-end;
    }

`



const Table = styled.table`
  border: 0px;
  border-collapse: separate;
  border-spacing: 0 10px;

  tbody th {
    flex: 1;
    margin : 30px;
    font-weight : 400;
  }
  
  tbody td {
    flex: 2;
    margin : 30px;
    font-weight : 400;
  }

  .title th {
    padding-bottom: 10px;

  }

  .title td {
    padding-bottom: 10px;

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
  border: 0px ;
  color : rgba(255,255,255);

  &:hover {
    cursor:pointer;
  }
`