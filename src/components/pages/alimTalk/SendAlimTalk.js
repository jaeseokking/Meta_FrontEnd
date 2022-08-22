import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import { refreshToken } from '../../auth/RefreshToken';
import Spinner from 'react-spinkit';
import leftButton from '../../../images/angle-left.svg';
import rightButton from '../../../images/angle-right.svg';
import InputList from './InputList';
import { isFriday } from 'date-fns';



const SendAlimTalk = ({loginCallBack}) => {
  const inputRef = useRef([]);
  const buttonInputRef = useRef([]);
  const navigate = useNavigate();
  

  const [loading, setLoading] = useState(false);
  const [shopList, setShopList] = useState([]);
  const [shop, setShop] = useState('');
  //const [issuanceDate, setIssuanceDate] = useState(new Date());
  //const [expirationDate, setExpirationDate] = useState('');
  const issuanceDate = new Date();
  const expirationDate = "";
  const [templateList , setTemplateList] = useState([]);
  const [templateIDX, setTemplateIDX] = useState(0);
  const [templateCode, setTemplateCode] = useState();
  const [itemCount, setItemCount] = useState(0);
  const [buttonNameList, setButtonNameList] = useState([]);
  const [buttonTypeList, setButtonTypeList] = useState([]);
  const [stampIssue, setStampIssue] = useState(0);

  useEffect(() => {
    try{
      refreshToken(loginCallBack);
    }catch(e){
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


//초기 설정한 데이터 가져오기
useEffect(() =>  { 

  async function getTemplate(){
    try {
      await axios.post(`${config.SERVER_URL}/api/get/template`, {}, {
        headers: {
          "Content-Type": `application/json`,
        },
        xhrFields: {
          withCredentials: true
        },
    })
      .then(res => {
        const {shopList , result, templateList} = res.data;
        if(result === "TOKEN ERROR"){
          alert(result);
          navigate("/login")
        }
        if(result === "SUCCESS"){
          console.log(templateList)
          setShopList(shopList);
          setShop(shopList[0].SHOP_INFO_NO);       
          setTemplateList(templateList);
          setTemplateCode(templateList[templateIDX].TEMPLATE_CODE);
          setItemCount(templateList[templateIDX].VAR);
          setStampIssue(templateList[templateIDX].STAMP_ISSUE);
          if(templateList[templateIDX].BUTTON_NAME != "" && templateList[templateIDX].BUTTON_NAME != null){
            const buttonName = templateList[templateIDX].BUTTON_NAME;
            const btnNameList = buttonName.split(",");
            const buttonType = templateList[templateIDX].BUTTON_TYPE;
            const btnTypeList = buttonType.split(",");
            setButtonNameList(btnNameList)
            setButtonTypeList(btnTypeList)
          }else{
            setButtonNameList([]);
            setButtonTypeList([]);
          }
        
        }
        if(result === "TOKEN EXPIRED"){
          alert(result);
          navigate("/login")
        }

        setLoading(true);

          
      })
      .catch(ex => {
      })
      .finally(() => {
      });
    } catch (error) {
      console.log(error);

    } 

   

  }

  getTemplate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])



useEffect(() =>  { 

  async function getTemplate(){
    try {
      const data ={
        SHOP_INFO_NO : shop
      }

      await axios.post(`${config.SERVER_URL}/api/get/template`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
        xhrFields: {
          withCredentials: true
        },
    })
      .then(res => {
        const {result, templateList} = res.data;

        if(result === "TOKEN ERROR"){
          alert(result);
          navigate("/login")
        }
        if(result === "SUCCESS"){
          setTemplateIDX(0);
          setTemplateList(templateList);

        }
        if(result === "TOKEN EXPIRED"){
          alert(result);
          navigate("/login")
        }
          
      })
      .catch(ex => {
      })
      .finally(() => {
        setLoading(true);
      });
    } catch (error) {
      console.log(error);

    } 

   

  }

  getTemplate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [shop])
   






  function selectShop(e){
    setShop(e.target.value);
    
  }

  function changeTemplate(e){
    const button = e.target.name;

    if(button === "before" && templateIDX !== 0){
      const IDX = templateIDX - 1;
      setTemplateCode(templateList[IDX].TEMPLATE_CODE);
      setTemplateIDX(IDX);
      setItemCount(templateList[IDX].VAR);
      setStampIssue(templateList[IDX].STAMP_ISSUE);
      if(templateList[IDX].BUTTON_NAME != "" && templateList[IDX].BUTTON_NAME != null){
        const buttonName = templateList[IDX].BUTTON_NAME;
        const btnNameList = buttonName.split(",");
        const buttonType = templateList[IDX].BUTTON_TYPE;
        const btnTypeList = buttonType.split(",");
        setButtonNameList(btnNameList)
        setButtonTypeList(btnTypeList)
      }else{
        setButtonNameList([]);
        setButtonTypeList([]);
      }

    }else if(button === "after" && templateIDX < templateList.length - 1){
      const IDX = templateIDX + 1;
      setTemplateCode(templateList[IDX].TEMPLATE_CODE);
      setTemplateIDX(IDX);
      setItemCount(templateList[IDX].VAR);
      setStampIssue(templateList[IDX].STAMP_ISSUE);
      if(templateList[IDX].BUTTON_NAME != "" && templateList[IDX].BUTTON_NAME != null){
        const buttonName = templateList[IDX].BUTTON_NAME;
        const btnNameList = buttonName.split(",");
        const buttonType = templateList[IDX].BUTTON_TYPE;
        const btnTypeList = buttonType.split(",");
        setButtonNameList(btnNameList)
        setButtonTypeList(btnTypeList)
      }else{
        setButtonNameList([]);
        setButtonTypeList([]);
      }
    }

  }


  function uploadexcel(e){

    //const template = templateCode;
    const excelval = e.target.value;
    const uploadExcel = document.querySelector("#uploadExcel");

    const buttonList = [];
    for(let i = 0; i < 5; i++){
      let urlList = [];
      for(let j = 0; j < 2; j++){
        if(buttonInputRef.current[[i,j]] !== null && buttonInputRef.current[[i,j]] !== undefined){
          if(buttonInputRef.current[[i,j]].value == ""){
            alert("입력된 값이 없습니다.")
            buttonInputRef.current[[i,j]].focus();
            uploadExcel.value = "";
            return;
          }else{
            urlList.push(buttonInputRef.current[[i,j]].value)
          }
        }
      }
      if(buttonInputRef.current[[i,0]] !== null && buttonInputRef.current[[i,0]] !== undefined){
        if(buttonInputRef.current[[i,0]].value !== ""){
          buttonList.push({
            buttonName : buttonNameList[i],
            buttonType : buttonTypeList[i],
            urlList : urlList,
          })
        }
      }
      urlList = [];
    }


   if(templateCode == null){
      return;
   }

   var excels = document.querySelectorAll("#uploadExcelForm")[0];

   if(excelval !==""){

    const formData = new FormData(excels);
    const fileName = e.target.files[0].name;
    //const files = e.target.files[0];      
    const value = [{
      shop_info_no : shop,
      templateCode : templateCode,
      stampIssue : stampIssue,
      buttonList : buttonList,
    }]

    formData.append("file", excels);
    const blob = new Blob([JSON.stringify(value)], {type : "application/json"})

    formData.append("data" , blob);
       
axios({
  method : "post",
  url : `${config.SERVER_URL}/kakao/uploadExcel.do?template=${templateCode}`,
  data : formData,
  headers: {
    "Accept": "application/json",
    "Content-Type": "multipart/form-data; application/json", 
  },
  xhrFields: {
    withCredentials: true
  },
}).then(res => {
  console.log(res);


  const message = res.data.result;
        if(message === "TOKEN ERROR"){
          alert(message);
          navigate("/login")
        }
        if(message === "SUCCESS"){
          alert(message);
          
          const resultarea = document.querySelector("#resultarea");
          resultarea.append("\n"+fileName+" : \n" +res.data.comment);


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
          alert('스탬프 발급 오류');
          window.location.reload();

        }
        uploadExcel.value = "";

 
})
    
}
}

  function downloadExel(e){
     e.preventDefault();

     var formval = document.uploadExcelForm;
     formval.action = `${config.SERVER_URL}/kakao/downloadExcel?templateCode=${templateCode}`;
     formval.submit();
     
  }

  function 단일업로드(e){


    for(let i = 0; i < 5; i++){
      for(let j = 0; j<itemCount + 1; j++){
        if(inputRef.current[[i,j]] !== null && inputRef.current[[i,j]] !== undefined){
          console.log(inputRef.current[[i,j]].value)
          if(inputRef.current[[i,j]].value === ""){
            alert("입력된 값이 없습니다.")
            inputRef.current[[i,j]].focus();
            return;
          }else{
            if(j == 0){
              const regPhone = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
              if(regPhone.test(inputRef.current[[i,j]].value) === false){
                alert('휴대폰 형식에 맞지않습니다.')
                inputRef.current[[i,j]].focus();
                return;
              }
            }
          }
        } 
      }
    }

    const buttonList = [];



    for(let i = 0; i < 5; i++){
      let urlList = [];
      for(let j = 0; j < 2; j++){
        if(buttonInputRef.current[[i,j]] !== null && buttonInputRef.current[[i,j]] !== undefined){
          if(buttonInputRef.current[[i,j]].value == ""){
            alert("입력된 값이 없습니다.")
            buttonInputRef.current[[i,j]].focus();
            return;
          }else{
            urlList.push(buttonInputRef.current[[i,j]].value)
          }
        }
      }
      if(buttonInputRef.current[[i,0]] !== null && buttonInputRef.current[[i,0]] !== undefined){
        if(buttonInputRef.current[[i,0]].value !== ""){
          buttonList.push({
            buttonName : buttonNameList[i],
            buttonType : buttonTypeList[i],
            urlList : urlList,
          })
        }
      }
      urlList = [];
    }

      if(templateCode === null){
        return;
      }
		
      const phone_length = document.querySelectorAll(".phonenum").length - 1;
			const excel = document.querySelectorAll("#uploadForm")[0];
      var phonenum = document.querySelector(".phonenum").value;
		// 	if( txtFieldCheck()){

    
          const formData = new FormData(excel);
      
          const value = [{
            shop_info_no : shop,
            templateCode : templateCode,
            var : itemCount,
            stampIssue : stampIssue,
            buttonList : buttonList,
          }]




          console.log(value);


          formData.append("file", excel);
          const blob = new Blob([JSON.stringify(value)], {type : "application/json"})
          formData.append("data" , blob);


          axios({
            method : "post",
            url : `${config.SERVER_URL}/kakao/uploadOne.do?template=${templateCode}`,
            data : formData,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then(res => {



            const message = res.data.result;
                  if(message === "TOKEN ERROR"){
                    alert(message);
                    navigate("/login")
                  }
                  if(message === "SUCCESS"){
                    alert(message);
                    
                 
                    const resultarea = document.querySelector("#resultarea");
                    resultarea.append("\n"+ phonenum +" : \n" +res.data.comment);
                    
          
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
                    alert('스탬프 발급 오류');
                    window.location.reload();
          
                  }
          }).then(()=>{
            const phoneInput = document.querySelectorAll(".phonenum");
            const inputss = document.querySelectorAll(".inputss");
            phoneInput.forEach((e) => {
                e.value = ""
            });
        
            inputss.forEach((e) => {
              e.value = ""
            })
          })
			
  }

  
  


  

  if(loading === true){
    return (
        <Wrapper>
            <Form>
               <Title>알림톡 전송 
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
               <div className="button_container">
                <div className="image" ><img name="before" alt="before_img" onClick={(e) => changeTemplate(e)} src={leftButton}/></div>
               </div>
               <TemplateContainer>
                    <div className="banner">
                        <div className="speaker"/>
                    </div>
                    
                    <div className="template_title">
                      {templateList.length > 0 ? templateList[templateIDX].TITLE : ""}
                     
                    </div>
                    <div className="templatediv">

                        <div>
                          <textarea readOnly value={templateList.length > 0 ? templateList[templateIDX].MESSAGE : ""}>
                          </textarea>
                          <div className="template_button" >
                              {buttonNameList.length > 0 ? buttonNameList.map((value, index) => {
                                  return(
                                    <div key={index} className="button">{value}</div>
                                  )
                                })
                                :
                                null
                              }
                          </div>
                        </div>
                        
                    </div>
                </TemplateContainer>
                <div className="button_container">
                  <div className="image" ><img name="after" alt="after_img" onClick={(e) => changeTemplate(e)} src={rightButton}/></div>
                </div>
                
                <form id="uploadExcelForm" name="uploadExcelForm" method="post" encType="multipart/form-data" >   
                   <Table>
                     <tbody>
                        <tr>
                          <th className="text_title">엑셀 업로드</th>
                          <td className="text_id">
                            <div id="fileDiv">
                              <input type="file" id="uploadExcel" name="uploadExcel" onChange={(e) => uploadexcel(e)} accept=".xls, .xlsx"/>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>엑셀 다운로드</th>
                          <td>
                            <button onClick={(e) => downloadExel(e)}>엑셀 다운로드</button>
                          </td>
                        </tr>
                        <tr>
                          <th>전송결과</th>
                          <td>
                            <textarea id="resultarea" readOnly>

                            </textarea>
                          </td>
                        </tr>
                 
                        {buttonTypeList.length > 0 ?
                        <tr>
                          <th style={{paddingBottom : 0}}>버튼 설정</th>
                          <td>
                          <Table2>
                            <tbody>
                              {
                              buttonTypeList.map((value, index) => {
                                return (
                                      <tr key={index}>
                                        <th>{buttonNameList[index]}</th>
                                          {value === "1" && 
                                            <td>
                                              URL 자동생성
                                              <input ref = {el => (buttonInputRef.current[[index,0]] = el)} style={{display : 'none'}} defaultValue={'자동생성'}></input><br/>
                                              <input ref = {el => (buttonInputRef.current[[index,1]] = el)} style={{display : 'none'}} defaultValue={'자동생성'}></input>
                                            </td>
                                          }
                                          {value === "2" && <td>메시지 본문에 있는 운송장 번호의 발송조회 페이지로 이동됩니다.</td>}
                                          {value === "3" && 
                                            <td>
                                              모바일링크    <input ref = {el => (buttonInputRef.current[[index,0]] = el)}></input><br/>
                                              PC링크    <input ref = {el => (buttonInputRef.current[[index,1]] = el)}></input>
                                            </td>
                                          }
                                           {value === "4" && 
                                            <td>
                                              AOS링크   <input ref = {el => (buttonInputRef.current[[index,0]] = el)}></input><br/>
                                              IOS링크    <input ref = {el => (buttonInputRef.current[[index,1]] = el)}></input>
                                            </td>
                                          }
                                          {value === "5" && <td>버튼클릭 시 버튼명을 대화창으로 회신합니다.</td>}
                                          {value === "6" && <td>버튼클릭 시 버튼명과 메시지 본문을 대화창으로 회신합니다.</td>}
                                          {value === "7" && <td>버튼클릭 시 카카오톡 채널이 추가됩니다. </td>}
                                      </tr> 
                                )
                              }) 
                            }

                            
                            </tbody>
                          </Table2>
                          </td>
                        </tr>

                        :
                        null
                        }
                        
                      
                     </tbody>
                   </Table>
                   </form>
               </Contents>
              

            </Form>
            <Form style={{marginTop : '10px' , width : 'fit-content'}}>
              <Contents>
              <form id="uploadForm" name="uploadForm" method="post" encType="multipart/form-data" >
                <table id="upload_info_table" summary="단일 업로드 정보를 입력하는 표">
                  <InputList itemCount={itemCount} inputRef={inputRef}/>                
                </table>
              </form>                
               </Contents>
               <div style={{height : "34px" , width : '200px;' , textAlign : 'center'}}>
               <Button onClick={(e) => 단일업로드(e)}>발급</Button>
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

export default SendAlimTalk;

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
  width : 1000px;
  background-color: white;
`

const Title = styled.div`
  font-family: 'SCDream_Bold';

  font-size : 30px;
  color : #714DDA;
  font-weight: 800;
  display: flex;
  flex-direction: row;

 
`

const Contents = styled.div`
  margin-top : 20px;
  display : flex;
  font-family: 'SCDream';

  th {
    font-family: 'SCDream_Bold';
  }


  ul {
    list-style:none;
    padding-left : 0;
    margin-left : 0;
  }

  input {
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
  }

  #uploadExcel {
    height : 100%;
    border : 0px;
    box-shadow : 0 ;
  }

  .button_container {
    height : 400px;
    width : 30px;
    display : table;
    padding : 5px;
  }
  .image {
    vertical-align: middle;
    width : 20px;
    height : 40px;
    display : table-cell;

  }

  img {
    width : 100%;
    cursor : pointer;
    -webkit-font-smoothing: antialiased;
    

    :hover {
      filter: invert(50%);
    }
  }

`

const Table = styled.table`
  border: 0px;
  border-collapse: separate;
  border-spacing: 0 0;


  tbody th {
    font-weight : 400;
    padding : 10px;
    font-family: 'SCDream_Bold';

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

  textarea {
    width : 100%;
    height : 230px;
  }

  .button_table{

    th {
      background-color: #F5F2F4;
      border-bottom : 1px solid #888;
      width : 100px;
    }

    td{
      border-bottom : 1px solid #888;
      padding-left : 20px;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }

    .checkbox {
      margin-left : 30px;
    }
  }
`

const Button = styled.button`
  font-family: 'SCDream_Bold';
  margin-top : 10px;
  width : 200px;
  margin-left : 5px;
  margin-right : 5px;
  height : 30px;
  align-self: flex-end;

  border-radius: 4px;
  font-size : 17px;
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
    font-size : 19px;
    border-radius: 5px;

  }

`

const Table2 = styled.table`
  border-collapse: separate;
  font-family: 'SCDream';
  border-spacing: 0 0px;
  width : 100%;
  font-size : 14px;

  tbody th {
    padding : 10px;
    font-family: 'SCDream_Bold';

  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }



  th {
    background-color: #F5F2F4;
    border-bottom : 1px solid #888;
    width : 100px;
  }

  td{
    border-bottom : 1px solid #888;
    padding-left : 20px;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .checkbox {
    margin-left : 30px;
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
        /* height: 400px; */
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
            margin-bottom : 15px;

            .speaker{
                width: 40px;
                height: 3px;
                border-radius: 0 0 3px 3px;
                background-color: #454545;
                margin: -4px auto;
            }
        }

        .templatediv{
            width: 208px;
            margin: 0 auto;
            text-align: center;
            background-color: #fff38e;
            margin-bottom : 10px;

            textarea {
                width: 205px;
                height: 320px;
                /* background-color: #fff38e; */
                background-color : transparent;
                border: 0;
                font-size : 12px;

            }

            .template_button{
              margin-top : -10px;
              margin-bottom : 10px;
              text-align : center;
              display : inline-block;
              /* background-color : #FFF38E; */

              .button {
                background-color: #f5f5f5;
                border-radius : 5px;
                height : 35px;
                line-height : 35px;
                margin-bottom : 5px;
                border : 1px solid #999;
              }
            }
        }

        .template_title { 
          width : 100%;
          height : 20px;
          text-align : center;
          margin-bottom : 5px;
        }

        .button {
          width : 100px;
          height : 10px;
          font-size : 12px;
        }


`

