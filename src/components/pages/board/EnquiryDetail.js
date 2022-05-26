import React, {useState, useEffect, useSyncExternalStore} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../auth/RefreshToken';
import Calendar from '../list/Calendar';
import axios from 'axios';
import * as config from '../../../config';
import {format} from 'date-fns';
import { useNavigate, useParams } from 'react-router';
import Spinner from 'react-spinkit';



const EnquiryDetail = ({loginCallBack}) => {

    const [loading, setLoading] = useState(false);
    
    
    const navigate = useNavigate();

    let getParameter = (key) => {
        return new URLSearchParams(window.location.search).get(key);
    }

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [reply, setReply] = useState();

    useEffect(() => {
      try{
        refreshToken(loginCallBack);
      }catch(e){
        console.log(e);
      }
    },[]);

    useEffect(() => {
      axios.post(`${config.SERVER_URL}/api/enquiry/detail`, {
        IDX : getParameter('idx'),
      }).then(response => {
        console.log('DATA' , response.data);

        if(response.data.result === 'NO DATA'){
          alert('접근권한이 없거나 없는 데이터입니다.');
          navigate('/stamp/list')
        }
        if(response.data.result === 'SUCCESS'){
          console.log(response.data.enquiryDetail)
          const detail = response.data.enquiryDetail;
          if(response.data.enquiryReply !== null){
            setReply(response.data.enquiryReply);
          }

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
               <Title>문의글</Title>
               <Contents>
                    <div className="title_container">
                        <div className="title"><div className="q_container"><div className='a'>Q</div></div>{title}</div>
                        <div className="subtitle"><div>{format(date, 'yyyy.MM.dd')}</div></div>
                    </div>
                    <div className="content">{content}</div>
                    {reply !== undefined ?
                        <>
                            <div className="boundary"></div>
                            <div className="title_container">
                                <div className="title"><div className="a_container"><div className='a'>A</div></div>[답변]</div>
                                {/* <div className="subtitle"><div>{format(date, 'yyyy.MM.dd')}</div></div> */}
                            </div>
                            <div className="content">{reply.CONTENT}</div>
                        </>
                        :
                       null
                    }
                </Contents>
                   <div style={{width : '100%', textAlign : 'end' , marginTop : '10px'}}> 
                    <Button style={{backgroundColor : 'rgba(1, 78, 136, 0.9)' }}>수정</Button>
                    <Button style={{ backgroundColor : 'rgba(150, 150, 150, 0.9)', marginRight : '30px'}} onClick={()=> navigate('/enquiry/list')}>확인</Button>
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

export default EnquiryDetail;

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
    width : 100%;
    flex-direction: row;
    display : flex;
  }

  .title {
      font-size:  20px;
      font-weight: 600;
      color : rgb(50,50,50);
      margin-bottom: 10px;
      flex : 1;
      align-self : right;
      flex-direction: row;
      display : flex;   
      text-justify : end ;
  }
  

  .subtitle{
      font-size : 15px;
      color : rgb(100,100,100);
      margin-bottom : 10px;
      align-self : center;
      text-align: right;

  }

  .content {
    padding : 10px;
  }

  .reply_title{
      margin-top : 20px;
      border-radius: 5px;
      padding : 2px 5px ;
      box-shadow: inset -2px -2px 2px 1px rgb(100,100,100);
  }


  .q_container {
        border-radius: 20px;
        width : 32px;
        height : 32px;
        background-color: pink;
        color : #f62a94;
        text-align: center;
        margin-right : 4px;
        position: relative;
    }
 

    .a_container {
        border-radius: 20px;
        width : 32px;
        height : 32px;
        background-color: #87cee3;
        color : #3e69ad;
        text-align: center;
        margin-right : 4px;
        position: relative;
    }

    .a {
        position: absolute; 
        bottom: 6px;
        left : 9px;
    }

    .boundary {
        margin : 20px;
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
  border: 0px ;
  color : rgba(255,255,255);

  &:hover {
    cursor:pointer;
  }
`