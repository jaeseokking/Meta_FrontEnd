import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import CalendarSetting from '../list/CalendarSetting';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import { refreshToken } from '../../auth/RefreshToken';
import Spinner from 'react-spinkit';
import reactStringReplace from 'react-string-replace';



const TemplateTM = ({loginCallBack}) => {
  const inputRef = useRef([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [shopList, setShopList] = useState([]);
  const [shop, setShop] = useState('');

  const [value, SetValue] = useState({
    message : "",
    title : "",
  })

  useEffect(() => {
    try{
      refreshToken(loginCallBack);
    }catch(e){
      console.log(e);
    }
  }, []);


  //초기 설정한 데이터 가져오기
  useEffect(() =>  { 

    async function getShopDetail(){
      try {
        await axios.post(`${config.SERVER_URL}/api/getShopList`, {}, {
          headers: {
            "Content-Type": `application/json`,
          },
      })
        .then(res => {
          const {shopList , result} = res.data;

          if(result === "TOKEN ERROR"){
            alert(result);
            navigate("/login")
          }
          if(result === "SUCCESS"){
            setShopList(shopList);
            setShop(shopList[0].SHOP_INFO_NO);       
  
          }
          if(result === "TOKEN EXPIRED"){
            alert(result);
            navigate("/login")
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

  getShopDetail();
  }, [])


  useEffect(()=> {
    const data = {SHOP_INFO_NO : shop}
    try {
    axios.post(`${config.SERVER_URL}/api/getStampSetting`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
    })
      .then(res => {
        const {setting , result} = res.data;     

        if(result === "TOKEN ERROR"){
          alert(result);
          navigate("/login")
        }
        if(result === "SUCCESS"){
 


          SetValue({
     
          })


          if(setting !== null){
 
        
            SetValue({

            })

            setLoading(true);
            return;
          }


          
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
  }, [shop]);





  function valueChange(e){
    SetValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  const SettingButton = () => {
    for(let i = 0; i<inputRef.current.length; i++){
      if(inputRef.current[i].value === ""){
        if(i < 3){
          inputRef.current[i].value = "";
        
          alert(inputRef.current[i].id + "을 설정해주세요.");
        }else{
          alert(inputRef.current[i].id + "를 입력해주세요.");
        }
        inputRef.current[i].focus();
        return;
      }
    }



    const data = {

    }
    try {
      axios.post(`${config.SERVER_URL}/api/stampSetting`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
        xhrFields: {
          withCredentials: true
        },
    })
      .then(res => {
        const message = res.data.result;
        if(message === "TOKEN ERROR"){
          alert(message);
          navigate("/login")
        }
        if(message === "SUCCESS"){
          window.location.reload();
        }
        if(message === "TOKEN EXPIRED"){
          alert("로그인 만료 다시 로그인해주세요.");
          navigate("/login")
        }
        if(message === "TOKEN NULL"){
          navigate("/login");
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
 
 

  function selectShop(e){
    setShop(e.target.value);
  }

  function insertTemplate(){
    for(let i = 0; i<inputRef.current.length; i++){
      if(inputRef.current[i].value === ""){
        alert(inputRef.current[i].id + "를 입력해주세요.");
        inputRef.current[i].focus();
        return;
      }
    }


    const data = {
      message : value.message.replaceAll(`<br>`, "\r\n"),
      title : value.title,
      shop_info_no : shop
    }
    try {
      axios.post(`${config.SERVER_URL}/api/template/insert`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
        xhrFields: {
          withCredentials: true
        },
    })
      .then(res => {
        

        const message = res.data.result;
        if(message === "TOKEN ERROR"){
          alert(message);
          navigate("/login")
        }
        if(message === "SUCCESS"){
          window.location.reload();
        }
        if(message === "TOKEN EXPIRED"){
          alert("로그인 만료 다시 로그인해주세요.");
          navigate("/login")
        }
        if(message === "TOKEN NULL"){
          navigate("/login");
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

  if(loading === true){
    return (
        <Wrapper>
            <Form>
               <Title>템플릿 등록
              <div style={{flex : '1', textAlign : 'right'}}>   
                    <Select style={{textAlign : 'center'}} onChange={e => selectShop(e)}>
                    {shopList.map((value, index) => 
                        <option key={value.SHOP_INFO_NO} value={value.SHOP_INFO_NO} >{value.SHOP_NAME}</option>
                        )
                    }
                    </Select>
               </div>
               </Title>
           
               <Contents>
                <TemplateContainer>
                    <div className="banner">
                        <div className="speaker"/>
                    </div>
                    <div className="templatediv">
                        <textarea placeholder='내용을 입력해주세요.' name="message" id="템플릿 내용" onChange={(e) => valueChange(e)} value={value.message} ref={el => (inputRef.current[0] = el)}></textarea>
                    </div>
                </TemplateContainer>
                   <Table>
                     <tbody>
                        <tr>
                          <th >탬플릿 제목</th>
                          <td><Input value={value.title}  placeholder={"제목을 입력해주세요."} name="title" id="템플릿 제목"  onChange={(e)=>valueChange(e)}  ref={el => (inputRef.current[1] = el)}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="registration_form"><Button onClick={insertTemplate}>등록</Button></td>
                        </tr>
                        <tr>
                            <td rowSpan={5} colSpan={2}>
                              <h3 className="description">
                                   발송할 때마다 달라지는 부분을 가변 값으로 설정할 수 있습니다.
                                  <br/>가변 항목은 <span>&#035;&#123;가변 항목&#125;</span> 형태로 본문에 입력하시면 됩니다.
                                  <br/> 내용 입력 예시: <span>&#035;&#123;고객명&#125;</span>님의 택배가 금일 <span>&#035;&#123;배송 시각&#125;</span>에 배달될 예정입니다.  
                                  <br/>가변 항목이 본문에 입력되면 오른쪽 항목 테이블에 매핑됩니다.<br/>
                              </h3>
                            </td>
                        </tr>
                     </tbody>
                   </Table>
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

export default TemplateTM;

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
  width : 100%;
  display: flex;
  flex-direction: row;
`

const Contents = styled.div`
  margin-top : 20px;
  display : flex;
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

  .registration_form {
    text-align : center;

     div {
        width : 200px;
        
     }
  }

  .description {
    margin : 20px;
    color: #9f6eaf;
    font-size: 14px;
    font-weight:600;
    line-height: 1.9em;
    float: right;
  }

`

const Button = styled.button`
  width : 40%;
  height : 30px;
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
`

const TemplateContainer = styled.div`
        width: 200px;
        height: 400px;
        border-radius: 20px;
        border: 7px solid #343434;
        background-color: #fff;
        float: left;    

        
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
                width: 190px;
                height: 300px;
                background-color: #fff38e;
                
                border: 0;
            }
        }


`