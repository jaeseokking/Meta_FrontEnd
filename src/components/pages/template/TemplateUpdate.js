import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import { refreshToken } from '../../auth/RefreshToken';
import Spinner from 'react-spinkit';
import leftButton from '../../../images/angle-left.svg';
import rightButton from '../../../images/angle-right.svg';



const TemplateUpdate = ({loginCallBack}) => {
  const navigate = useNavigate();
  

  const [loading, setLoading] = useState(false);
  const [shopList, setShopList] = useState([]);
  const [shop, setShop] = useState('');
  const [templateList , setTemplateList] = useState([]);
  const [templateIDX, setTemplateIDX] = useState(0);
  const [status, setStatus] = useState(4);
  const [templateTitle, setTemplateTitle] = useState('');
  const [templateCode, setTemplateCode] = useState('');
  const [itemCount, setItemCount] = useState("");
  const [talkCode, setTalkCode] = useState('');

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
  


//초기 설정한 데이터 가져오기
useEffect(() =>  { 
  const bizno = getParameter("bizno");
  const data ={
    bizno : bizno
  }


  async function getTemplate(){
    try {
      await axios.post(`${config.SERVER_URL}/api/get/template`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
    })
      .then(res => {
        const {shopList , result, templateList} = res.data;

        if(result === "TOKEN ERROR"){
          alert(result);
          navigate("/login")
        }
        if(result === "SUCCESS"){
          setShopList(shopList);
          setShop(shopList[0].SHOP_INFO_NO);       
          setTemplateList(templateList);
          setTemplateCode(templateList[templateIDX].TEMPLATE_CODE);
          setItemCount(templateList[templateIDX].VAR);
          setTemplateTitle(templateList[templateIDX].TITLE)
          setStatus(templateList[templateIDX].GRADE);
          setTalkCode(templateList[templateIDX].TALK_CODE);

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
}, [])



useEffect(() =>  { 

  const bizno = getParameter("bizno");


  async function getTemplate(){
    try {
      const data ={
        shop_info_no : shop,
        bizno : bizno
      }

      await axios.post(`${config.SERVER_URL}/api/get/template`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
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
          setItemCount(templateList[templateIDX] ? templateList[templateIDX].VAR : "");
          setTemplateTitle(templateList[templateIDX] ? templateList[templateIDX].TITLE : "")
          setStatus(templateList[templateIDX] ? templateList[templateIDX].GRADE : "");
          setTemplateCode(templateList[templateIDX] ? templateList[templateIDX].TEMPLATE_CODE : "");
          setTalkCode(templateList[templateIDX] ? templateList[templateIDX].TALK_CODE : "");


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

  function selectStatus(e){
    setStatus(e.target.value);
  }

  function changeTemplate(e){
    const button = e.target.name;

    if(button === "before" && templateIDX !== 0){
      const IDX = templateIDX - 1;
      setTemplateCode(templateList[IDX].TEMPLATE_CODE ? templateList[IDX].TEMPLATE_CODE : "");
      setTemplateIDX(IDX);
      setItemCount(templateList[IDX].VAR);
      setTemplateTitle(templateList[IDX].TITLE);
      setStatus(templateList[IDX].GRADE);
      setTalkCode(templateList[IDX].TALK_CODE);
    }else if(button === "after" && templateIDX < templateList.length - 1){
      const IDX = templateIDX + 1;
      setTemplateCode(templateList[IDX].TEMPLATE_CODE ? templateList[IDX].TEMPLATE_CODE : "");
      setTemplateIDX(IDX);
      setItemCount(templateList[IDX].VAR);
      setTemplateTitle(templateList[IDX].TITLE);
      setStatus(templateList[IDX].GRADE);
      setTalkCode(templateList[IDX].TALK_CODE);

    }



  }


  function updateTemplate(e){
    e.preventDefault();
    const data = {
      shop_info_no : shop,
      talkCode : talkCode,
      status : status,
      templateTitle : templateTitle,
      templateCode : templateCode,
      itemCount : itemCount
    }
    
    try {
      axios.post(`${config.SERVER_URL}/api/template/update`, JSON.stringify(data), {
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
          alert(message);
          window.location.reload();
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
          
      })
      .catch(ex => {
      })
      .finally(() => {
      });
    } catch (error) {
      console.log(error);
      
    } 
  }

  function deleteTemplate(e){
    e.preventDefault();

    if(window.confirm("삭제하시겠습니까?") === true){

      const data = {
        shop_info_no : shop,
        talkCode : talkCode,
      }
    
      try {
        axios.post(`${config.SERVER_URL}/api/template/delete`, JSON.stringify(data), {
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
            alert("삭제완료");
            window.location.reload();
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
            
        })
        .catch(ex => {
        })
        .finally(() => {
        });
      } catch (error) {
        console.log(error);
        
      } 
      return;
    }else{
      return ;
    }
   
  }
 
  




  
  




  if(loading === true){
    return (
        <Wrapper>
            <Form>
               <Title>탬플릿 수정
              <div style={{flex : '1', textAlign : 'right'}}>   
                <Select style={{textAlign : 'center'}}  onChange={e => selectShop(e)}>
                  {shopList.map((value, index) => 
                    <option key={value.SHOP_INFO_NO} value={value.SHOP_INFO_NO} >{value.SHOP_NAME}</option>
                    )
                  }
               </Select>
               </div>
               </Title>
           
               <Contents>
               <div className="button_container">
                <div className="image" ><img alt='before_img' name="before" onClick={(e) => changeTemplate(e)} src={leftButton}/></div>
              </div>
               <TemplateContainer>
                    <div className="banner">
                        <div className="speaker"/>
                    </div>
                    
                    <div className="template_title">
                      {templateList.length > 0 ? templateList[templateIDX].TITLE : ""}
                     
                    </div>
                    <div className="templatediv">
                      {
                        <textarea readOnly value={templateList.length > 0 ? templateList[templateIDX].MESSAGE : ""}>
                        </textarea>
                      }
                        
                    </div>
                </TemplateContainer>
                <div className="button_container">
                  <div className="image" ><img alt='after_img' name="after" onClick={(e) => changeTemplate(e)} src={rightButton}/></div>
                </div>
                
                <form id="uploadExcelForm" name="uploadExcelForm" method="post" encType="multipart/form-data">   
                   <Table>
                     <tbody>
                      <tr>
                        <th>NO.</th>
                        <td >
                          {talkCode}
                        </td>
                      </tr>
                        <tr>
                          <th className="text_title">상태</th>
                          <td className="text_id">
                            <Select value={status || ""} onChange={e => selectStatus(e)}>
                              <option value={0} selected={status === 0 ?  "selected" : null} defaultValue={true}>신청완료</option>
                              <option value={1} selected={status === 1 ?  "selected" : null} defaultValue={false}>검수중</option>
                              <option value={2} selected={status === 2 ?  "selected" : null} defaultValue={false}>검수완료</option>
                              <option value={3} selected={status === 3 ?  "selected" : null} defaultValue={false}>사용가능</option>
                              <option value={4}selected={status === 4 ?  "selected" : null} defaultValue={false}>부결</option>
                            </Select>
                          </td>
                        </tr>
                        <tr>
                          <th className="text_title">템플릿 제목</th>
                          <td><Input onChange={e => setTemplateTitle(e.target.value)} value={templateTitle}/></td>
                        </tr>
                        <tr>
                          <th className="text_title">템플릿 코드</th>
                          <td><Input onChange={e => setTemplateCode(e.target.value)} value={templateCode}/></td>
                        </tr>
                        <tr>
                          <th className="text_title">항목 갯수</th>
                          <td><Input onChange={e => setItemCount(e.target.value)} value={itemCount}/></td>
                        </tr>
                        <tr>
                          <td colSpan={2}><Button  className="up_button" onClick={(e) => updateTemplate(e)}>수정</Button></td>
                        </tr>
                        <tr>
                        <td colSpan={2}><Button className="del_button" onClick={(e) => deleteTemplate(e)}>삭제</Button></td>
                        </tr>
                                     
                  
                      
                     </tbody>
                   </Table>
                   </form>
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

export default TemplateUpdate;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin : 0 auto;
  

`
const Form = styled.div`
  border : 0px solid gray; 
  border-radius : 10px;
  box-shadow: 5px 5px 10px 0px gray;
  padding : 40px;
  margin-top : 20px;
`

const Title = styled.div`
  font-size : 30px;
  color : #714DDA;
  font-weight: 800;
  width : 100%;
  display: flex;
  flex-direction: row;
`

const Contents = styled.div`
  margin-top : 20px;
  display : flex;

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

  textarea {
    width : 100%;
    height : 300px;
  }


  .up_button {
    margin-top : 10px;
    background-color : #714DDA;
  }

  .del_button {
    background-color : #CC0000;
  }

`

const Button = styled.button`
  width : 100%;
  margin-left : 5px;
  margin-right : 5px;
  height : 35px;
  align-self: flex-end;

  border-radius: 4px;
  font-size : 15px;
  outline: 0;
  border: 0;
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

        .template_title { 
          width : 100%;
          height : 20px;
          text-align : center;
          margin-bottom : 5px;
        }


`

