import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import { refreshToken } from '../../auth/RefreshToken';
import Spinner from 'react-spinkit';
import LoadingForeground from '../../layout/LoadingForeground';



const TemplateManager = ({ loginCallBack }) => {
  const inputRef = useRef([]);
  const inputButtonRef = useRef([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [resLoading ,setResLoading] = useState(true);
  const [shopList, setShopList] = useState([]);
  const [shop, setShop] = useState('');
  const [textLength , setTextLength] = useState(0);
  const buttonList = [0, 1, 2, 3, 4];

  const [value, SetValue] = useState({
    message: "",
    title: "",
  })

  const [button, SetButton] = useState([
    {
      id : 0,
      buttonName : '',
      buttonType : 0,
    },
    {
      id : 1,
      buttonName : '',
      buttonType : 0,
    },
    {
      id : 2,
      buttonName : '',
      buttonType : 0,
    },
    {
      id : 3,
      buttonName : '',
      buttonType : 0,
    },
    {
      id : 4,
      buttonName : '',
      buttonType : 0,
    },
  ])

  const [stampIssue, setStampIssue] = useState(0);



  useEffect(() => {
    try {
      refreshToken(loginCallBack);
    } catch (e) {
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  //초기 설정한 데이터 가져오기
  useEffect(() => {

    async function getShopDetail() {
      try {
        await axios.post(`${config.SERVER_URL}/api/getShopList`, {}, {
          headers: {
            "Content-Type": `application/json`,
          },
        })
          .then(res => {
            const { shopList, result } = res.data;

            if (result === "TOKEN ERROR") {
              alert(result);
              navigate("/login")
            }
            if (result === "SUCCESS") {
              if(shopList.length < 1){
                alert("등록된 가맹점이 없습니다. 가맹점을 등록해주세요.")
                navigate('/info/shop/create');          
              }
              setShopList(shopList);
              setShop(shopList[0].SHOP_INFO_NO);

            }
            if (result === "TOKEN EXPIRED") {
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
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    const data = { SHOP_INFO_NO: shop }
    try {
      axios.post(`${config.SERVER_URL}/api/getStampSetting`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
        .then(res => {
          const { setting, result } = res.data;


          if (result === "TOKEN ERROR") {
            alert(result);
            navigate("/login")
          }
          if (result === "SUCCESS") {



            SetValue({

            })


            if (setting !== null) {


              SetValue({

              })

              setLoading(true);
              return;
            }



            setLoading(true);
            return;
          }
          if (result === "TOKEN EXPIRED") {
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
  }, [shop]);





  function valueChange(e) {
    console.log(e.target.value.length> 1000)
    console.log(e.target.name === 'message');
    if(e.target.name === 'message'){
      setTextLength(e.target.value.length)
    }
    SetValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }



  function selectShop(e) {
    setShop(e.target.value);
  }

  function insertTemplate() {
    setResLoading(false);
    if(window.confirm("템플릿을 등록하시겠습니까?") === false){
      setResLoading(true);
      return;
    }
    setTimeout(() => {insert()} , 500)


  function insert(){
    if(textLength > 1000){
     alert('템플릿 내용은 1000자 이내로 가능합니다.')
     inputRef.current[0].focus();
     return;
    }

    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value === "") {
        alert(inputRef.current[i].id + "를 입력해주세요.");
        inputRef.current[i].focus();
        setResLoading(true);
        return;
      }
    }

    let buttonResult = true;
    var blank_pattern = /^\s+|\s+$/g;
    button.map((value, index) => {
      if(value.buttonType !== 0 && (value.buttonName == "" || value.buttonName == null || value.buttonName.replace(blank_pattern,"") == "")){
        alert('버튼이름을 확인해 주세요.');
        inputButtonRef.current[index].focus();
        buttonResult = false;
      }
    })

    if(buttonResult === false){
      setResLoading(true);
      return;
    }

    const buttonList = button.filter((value) => value.buttonType !== 0);
    console.log(buttonList);
    let buttonType = ""; 
    let buttonName = "";
    if(buttonList.length > 0){
      buttonList.map((value, index) => {
        if(index === 0){
          buttonType = value.buttonType
          buttonName = value.buttonName
        }else{
          buttonType += `,${value.buttonType}`
          buttonName += `,${value.buttonName}`
        }
      })
    }

    if(stampIssue !== 0 && stampIssue !== 1){
      window.location.reload();
    }



    const data = {
      message: value.message.replaceAll(`<br>`, "\r\n"),
      title: value.title,
      shop_info_no: shop,
      //buttonList : buttonList,
      buttonName : buttonName,
      buttonType : buttonType,
      stampIssue : stampIssue,
    }

    console.log(data);
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


          const message = res.data

          if (message == 1) {
            alert("탬플릿 등록이 완료되었습니다.")
            window.location.reload();

          } else {
            alert('INSERT ERROR')
          }


        })
        .catch(ex => {
          console.log(ex);
        })
        .finally(() => {
          setResLoading(true);
        });
      } catch (error) {
        console.log(error);

      }
          
    }
  }


  function changeSelect(e){
    console.log(parseInt(e.target.value))
    SetButton([...button], button[e.target.id].buttonName = '');
    SetButton([...button], button[e.target.id].buttonType = parseInt(e.target.value))
    if(parseInt(e.target.value) === 7){
      SetButton([...button], button[e.target.id].buttonName = '채널 추가');
    }

    console.log(button);
  }


  function changeButtonName(e){
    SetButton([...button], button[e.target.id].buttonName = e.target.value)
  }

  function changeButtonList(){
    var blank_pattern = /^\s+|\s+$/g;
    button.map((value, index) => {
      if(value.buttonType !== 0 && (value.buttonName == "" || value.buttonName == null || value.buttonName.replace(blank_pattern,"") == "")){
        alert('버튼이름을 확인해 주세요.')
        inputButtonRef.current[index].focus();
      }
    })

    const buttonList = button.filter((value) => value.buttonType !== 0);
    console.log(buttonList);
  }

  function changeStampIssue(e){
    setStampIssue(parseInt(e.target.value));
  }

  if (loading === true) {
    return (
      <Wrapper>
        {resLoading === false &&
          <LoadingForeground/>
        }
        <Form>
          <Title>템플릿 등록
            <div style={{ flex: '1', textAlign: 'right' }}>
              {shopList ?
                <Select style={{ textAlign: 'center' }} onChange={e => selectShop(e)}>
                  {shopList.map((value, index) =>
                    <option key={value.SHOP_INFO_NO} value={value.SHOP_INFO_NO} >{value.SHOP_NAME}</option>
                  )
                  }
                </Select>
                :
                null
              }
            </div>
          </Title>

          <Contents>
            <TemplateContainer>
              <div className="banner">
                <div className="speaker" />
              </div>
              <div className="templatediv">
                <div className="textsize_form"><span style={{color : textLength > 1000 ? "red" : ""}} className="textLength">{textLength}</span><span> /1000 자</span></div>
                <textarea 
                  placeholder='내용을 입력해주세요.' 
                  name="message" 
                  id="템플릿 내용" 
                  onChange={(e) => valueChange(e)} 
                  value={value.message} 
                  ref={el => (inputRef.current[0] = el)}
                  maxLength={1000}
                  >
                </textarea>
              </div>
            </TemplateContainer>
            <Table>
              <tbody>
                <tr>
                  <th>스탬프 발급유무</th>
                  <td>
                    <Select onChange={(e) => changeStampIssue(e)}>
                      <option value={0}>단순 알림톡(스탬프 미발급)</option>
                      <option value={1}>스탬프 발급 알림톡</option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <th >탬플릿 제목</th>
                  <td><Input placeholder={"제목을 입력해주세요."} name="title" id="템플릿 제목" onChange={(e) => valueChange(e)} value={value.title || ""} ref={el => (inputRef.current[1] = el)} /></td>
                </tr>
                <tr className="button_setting">
                  <th>버튼 추가</th>
                  <td>
                        <Table2>
                          <tbody>
                            {buttonList.map((value, index) => {
                              return (
                              <tr key={index}>
                                <th>버튼타입</th>
                              <td>
                              <Select id={value} onChange={(e) => changeSelect(e)}>
                                <option value={0}>설정안함</option>  
                                <option value={1}>스탬프 확인(url 자동생성)</option>  
                                <option value={2}>배송조회</option>  
                                <option value={3}>웹링크</option>  
                                <option value={4}>앱링크</option>  
                                <option value={5}>봇키워드</option>  
                                <option value={6}>메세지 전달</option>  
                                <option value={7}>채널 추가</option>  
                              </Select>
                              </td>
                              <th>버튼{value + 1}</th>
                              {button[value].buttonType === 0 ?
                              <td className="input_container">
                                없음
                              </td>
                              :
                              <td className="input_container">
                                  <Input 
                                    id ={value}
                                    className="button_name" 
                                    placeholder={"버튼이름"} 
                                    maxLength="14" 
                                    disabled={button[value].buttonType === 0 || button[value].buttonType === 7}
                                    value={button[value].buttonName}
                                    onChange={(e) => changeButtonName(e)}
                                    ref={el => (inputButtonRef.current[value] = el)}
                                  ></Input>
                                  <br/>
                                  <span>
                                    {button[value].buttonType === 1 && "스탬프 확인 url은 자동 설정됩니다."}
                                    {button[value].buttonType === 2 && "메시지 본문에 있는 운송장 번호의 발송조회 페이지로 이동됩니다."}
                                    {button[value].buttonType === 3 && "알림톡 발송시 url을 입력해야합니다. (모바일링크, PC링크) "}
                                    {button[value].buttonType === 4 && "알림톡 발송시 url을 입력해야합니다. (AOS링크, IOS링크)"}
                                    {button[value].buttonType === 5 && "버튼클릭 시 버튼명을 대화창으로 회신합니다."}
                                    {button[value].buttonType === 6 && "버튼클릭 시 버튼명과 메시지 본문을 대화창으로 회신합니다."}
                                    {button[value].buttonType === 7 && "버튼클릭 시 카카오톡 채널이 추가됩니다. (버튼명 수정 불가)"}
                                  </span>
                              </td>
                              }
                            </tr>
                              )
                            })
                            }
                          </tbody>
                        </Table2>
                        {/* <div className="button_name">버튼이름</div> 
                        <Input></Input> 
                        <div className="button_name">버튼타입</div> 
                        <Select>
                          <option value="0">버튼 타입</option>  
                          <option>스탬프 확인(url 자동생성)</option>  
                          <option>배송조회</option>  
                          <option>웹링크</option>  
                          <option>봇키워드</option>  
                          <option>메세지 전달</option>  
                          <option>채널 추가</option>  
                        </Select>  */}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="registration_form"><Button onClick={insertTemplate}>등록</Button></td>
                </tr>
                <tr>
                  <td rowSpan={5} colSpan={2}>
                    <h3 className="description">
                      발송할 때마다 달라지는 부분을 가변 값으로 설정할 수 있습니다.
                      <br />가변 항목은 <span>&#035;&#123;가변 항목&#125;</span> 형태로 본문에 입력하시면 됩니다.
                      <br /> 내용 입력 예시: <span>&#035;&#123;고객명&#125;</span>님의 택배가 금일 <span>&#035;&#123;배송 시각&#125;</span>에 배달될 예정입니다.
                      <br />가변 항목이 본문에 입력되면 오른쪽 항목 테이블에 매핑됩니다.<br />
                      버튼은 최대 5개까지 등록가능합니다.
                    </h3>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Contents>
        </Form>


      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Spinner name="ball-grid-pulse" color="steelblue" />
      </Wrapper>
    )
  }
};

export default TemplateManager;

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
  width : 1100px;
  background-color: white;
  margin-bottom: 100px;
`

const Title = styled.div`
  font-size : 30px;
  color : #714DDA;
  font-weight: 800;
  width : 100%;
  display: flex;
  flex-direction: row;
  font-family: 'SCDream_Bold';
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
  border-spacing: 0 0px;
  margin-left : 30px;

  tbody th {
    font-weight : 400;
    padding : 5px;
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
    float: left;
  }

  th, td {
    padding : 10px;
    font-size: 15px;
    height : 35px;
    border-bottom : 1px solid #aeaeae;

  }

  td:first-child{
    border-left : 0px;

  }

  tr:first-child td {
    border-top: 1px solid black;

  }

  tr:first-child th {
    border-top: 1px solid black;
  }

  th:first-child{
    border-left : 0px;
  }

  th {
    background-color: #F5F2F4;
    
    border-left : 1px solid #aeaeae;
    font-family: 'SCDream_Bold';
  }

  td {
    padding : 7px 7px 7px 20px;
    border-left : 1px solid #aeaeae;
  }

  td:last-child{
    height : 50px;
  }

  .button_setting {
    ul {
      list-style:none;
      padding-left : 0;
      
    }

    li {
      display: flex;
      height : 50px;
      line-height : 50px;
    }

  }

`
const Button = styled.button`
  font-family: 'SCDream_Bold';
  width : 200px;
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

  &:hover{
    width : 220px;
    height : 34px;
    font-size : 22px;
    border-radius: 5px;
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
        width: 220px;
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
          margin: -16px auto;
          text-align: center;

          textarea {
              width: 205px;
              height: 330px;
              background-color: #fff38e;
              border: 0;
              font-size : 12px;

          }
          
          .textsize_form {
            font-size : 13px;
            float : right;
            margin-right : 10px;
          }
      }


`


const Table2 = styled.table`
  border: 0px;
  border-collapse: separate;
  border-spacing: 0 0px;
  margin-left : 30px;

  tbody th {
    font-weight : 400;
    padding : 5px;
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

  th, td {
    padding : 10px;
    font-size: 15px;
    height : 35px;
    border-bottom : 1px solid #aeaeae;

  }

  td:first-child{
    border-left : 0px;

  }

  tr:first-child td {
    border-top: 1px solid black;

  }

  tr:first-child th {
    border-top: 1px solid black;
  }

  th:first-child{
    border-left : 0px;
  }

  th {
    background-color: #F5F2F4;
    border-left : 1px solid #aeaeae;
    font-family: 'SCDream';
    width : 100px;
  }

  td {
    padding : 7px 7px 7px 20px;
    border-left : 1px solid #aeaeae;
  }

  .button_setting {
    ul {
      list-style:none;
      padding-left : 0;
      
    }

    li {
      display: flex;
      height : 50px;
      line-height : 50px;
    }

    .button_name {
      width : 70px;
    }
  }

  .input_container {
    width : 250px;
  }


`