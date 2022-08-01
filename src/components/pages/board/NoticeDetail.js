import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../auth/RefreshToken';
import axios from 'axios';
import * as config from '../../../config';
import {format} from 'date-fns';
import { useNavigate } from 'react-router';
import Spinner from 'react-spinkit';


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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
      axios.post(`${config.SERVER_URL}/api/notice/detail`, {
        IDX : getParameter('idx'),
      }).then(response => {
        if(response.data.result === 'NO DATA'){
          alert('접근권한이 없거나 없는 데이터입니다.');
          navigate('/notice/list')
        }
        if(response.data.result === 'SUCCESS'){
          const detail = response.data.noticeDetail;
          setTitle(detail.TITLE);
          setContent(detail.CONTENT);
          setDate(detail.DATE);
          setLoading(true);
        }else{
          navigate('/login');
        }
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Spinner name="ball-grid-pulse" color="steelblue" />
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

  white-space: pre-wrap;

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