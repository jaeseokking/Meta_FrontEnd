import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import { refreshToken } from '../../auth/RefreshToken';
import Spinner from 'react-spinkit';
import {format} from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";



const TemplateMessage = ({loginCallBack}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [templateMessage, setTemplateMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [templateChat, setTamplateChat] = useState([]);


  let getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  }


  useEffect(() => {
    try{
      refreshToken(loginCallBack);
    }catch(e){
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  useEffect(()=> {
    const talkCode = getParameter("tc");
    const data = {
        talkCode : talkCode
    }

    try {
    axios.post(`${config.SERVER_URL}/api/template/message`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
    })
      .then(res => {
        const {templateMessage , templateChat, result} = res.data;

        if(result === "TOKEN ERROR"){
          alert(result);
          navigate("/login")
        }
        if(result === "SUCCESS"){
          setTemplateMessage(templateMessage)
          setTamplateChat(templateChat)
          setLoading(true);
          return;
        }
        if(result === "TOKEN EXPIRED"){
          alert(result);
          navigate("/login")
        }
          
      })
      .catch(ex => {
      })
    } catch (error) {
      console.log(error);
      
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function regMessage(){
    const talkCode = getParameter("tc");
    if(inputValue === "" ){
        alert("댓글을 입력해주세요.")
        const input = document.querySelector('#message_input');
        input.focus();
        return;
    }

    const data = {
        content : inputValue,
        talkCode : talkCode

    }

   

    try {
        axios.post(`${config.SERVER_URL}/api/insert/templateMessage`, JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
          xhrFields: {
            withCredentials: true
          },
      })
        .then(res => {
          const result = res.data;
          if(result > 0){
            alert('댓글 등록완료')
            window.location.reload();
          }else{
            alert('댓글 등록실패')
            window.location.reload();
          }

            
        })
        .catch(ex => {
        })
        .finally(() => {
        });
      } catch (error) {
        console.log(error);
        
      } 
  }

  function inputChange(e){
    setInputValue(e.target.value);
  }

  if(loading === true){
    return (
        <Wrapper>
            <Form>

           
               <Contents>
                <TemplateContainer>
                    <div className="banner">
                        <div className="speaker"/>
                    </div>
                    <div className="templatediv">
                        <textarea placeholder='내용을 입력해주세요.' name="message" id="템플릿 내용"  value={templateMessage} readOnly></textarea>
                    </div>

                    
                </TemplateContainer>
                <ChatContainer>
                    <div className="register">
                        <Input type="text" id="message_input" onChange={(e) => inputChange(e)} placeholder="댓글을 작성해주세요."></Input>
                        <Button id="reg_message" onClick={regMessage}>등록</Button>
                    </div>
                   <div className="comment">
                        {templateChat.length > 0 ?
                            templateChat.map((value, index) => {

                                const date = new Date(value.REG_DATE);


                                return (<ul>
                                        <li className="comment_name" id="comment_name">
                                            <FontAwesomeIcon icon={faUser} />{value.CEONAME}
                                        </li>
                                        <li className="comment_text">
                                            {value.CONTENT}
                                        </li>
                                        <li className='comment_date'>
                                            {format(date, 'yyyy-MM-dd')}
                                        </li>
                                    </ul>

                                );
                            })
                            :
                            null
                        }
                   </div>
                   </ChatContainer>
               </Contents>
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

export default TemplateMessage;

const Wrapper = styled.div`
  font-family: 'SCDream';
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width : 100%;
  padding-left: 50px;
  padding-top : 50px;
  

`
const Form = styled.div`
  border : 0px solid gray; 
  border-radius : 10px;
  box-shadow: 5px 5px 10px 0px gray;
  padding : 40px;
  width : 500px;
  background-color: white;
`


const Contents = styled.div`
  margin-top : 20px;
  display : flex;
  flex-direction : column;
  width : 100%;
  text-align: center;;

  .register {
    margin : 10px;
    width : 400px;
    display : inline-flex;
    text-align :  center;
  
    

    input {
        width : 300px;
        float : left;
    }

    button {
        width : 100px;
        float : left;
        
    }
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

const Button = styled.button`
  font-family: 'SCDream';
  width : 200px;
  margin-left : 5px;
  margin-right : 5px;
  height : 35px;
  align-self: flex-end;

  border-radius: 4px;
  font-size : 15px;
  outline: 0;
  border: 0;
  background-color : #714DDA;
  color : rgba(255,255,255);
  cursor:pointer;
  box-shadow: 1px 1px 3px 0px gray;
  transition : 0.3s;

  &:hover{
    border-radius: 10px;
  }

`

const TemplateContainer = styled.div`
        width: 220px;
        height: 400px;
        border-radius: 20px;
        border: 7px solid #343434;
        background-color: #fff;
        float: left;    
        margin: 0 auto;
        
        .banner {
            width: 80px;
            height: 20px;
            border-radius: 0 0 15px 15px;
            background-color: #343434;
            margin: 0px auto;
            margin-bottom : 30px;

            .speaker{
                width: 40px;
                height: 3px;
                border-radius: 0 0 3px 3px;
                background-color: #454545;
                margin: -4px auto;
            }
        }

        .templatediv{
          margin: 0 auto;
          text-align: center;

          textarea {
              width: 205px;
              height: 330px;
              background-color: #fff38e;
              border: 0;
              font-size : 12px;

          }
      }


`

const ChatContainer = styled.div`
     ul {
      text-align : left;
     }
     
      li {
        list-style: none;
      }
      
      .comment_name {
        font-weight : 800;
        font-size : 18px;
      }

      .comment_text{
        font-weight : 500;
        font-size : 17px;
      }

      .comment_date {
        font-weight : 100;
        font-size : 14px;
      }
`