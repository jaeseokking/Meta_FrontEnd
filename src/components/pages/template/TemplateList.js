import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../auth/RefreshToken';
import Calendar from '../list/Calendar';
import axios from 'axios';
import PageButtons from '../../utils/PageButtons';
import * as config from '../../../config';
import {format} from 'date-fns';
import { useNavigate } from 'react-router';
import Spinner from 'react-spinkit';


const TemplateList = ({loginCallBack}) => {
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [selectUse, setSelectUse] = useState('all');
    const [shopList, setShopList] = useState([]);
    const [shop, setShop] = useState('');

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
      try{
        refreshToken(loginCallBack);
      }catch(e){
        console.log(e);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
      try{
        refreshToken(loginCallBack);
      }catch(e){
        console.log(e);
      }
    },[page, startDate, endDate, selectUse]);



    useEffect(() => {


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
              navigate("/login")
            }
            if(result === "TOKEN EXPIRED"){
              alert("로그인 만료 다시 로그인해주세요.");
              navigate("/login")
            }

            if(result === "SUCCESS"){
              if(shopList != null){
                setShopList(shopList);
              }
              setShop(shopList[0].SHOP_INFO_NO);       
    
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

      async function getTemplate(){
          axios.post(`${config.SERVER_URL}/api/template/board`, {
            page : page,
            startDate : startDate,
            endDate : endDate,
            selectUse : selectUse,
            shop_info_no : shop,
          }).then(response => {
            setList(response.data.templateList)
            setLoading(true);
    
          })
        
        
      }
  
      getShopDetail();
      getTemplate();
    }, [])
  
    useEffect(() => {
        axios.post(`${config.SERVER_URL}/api/template/board`, {
          page : page,
          startDate : startDate,
          endDate : endDate,
          selectUse : selectUse,
          shop_info_no : shop,
        }).then(response => {
          setList(response.data.templateList)
          setLoading(true);
  
        })
      
      
    }, [page, shop])
  
    function selectShop(e){
      setShop(e.target.value);
    }

    if(loading === true){
      return (
        <Wrapper>
            <Form>
               <Title>탬플릿 조회
               <div style={{flex : '1', textAlign : 'right'}}>   
                <Select style={{textAlign : 'center'}} onChange={e => selectShop(e)}>
                  {shopList.length > 0  ? shopList.map((value, index) => 
                    <option key={value.SHOP_INFO_NO} value={value.SHOP_INFO_NO} >{value.SHOP_NAME}</option>
                    ) :
                    null
                  }
               </Select>
               </div>
               </Title>
               <Contents>
               {/* <SearchForm>
                        <Calendar startDate={setStartDate} endDate={setEndDate} currentPage={setPage} selectUse={setSelectUse}/>     
                </SearchForm> */}
                 {list.length > 0 ?
                 <>
                
                <Table>
                <thead>
                    <tr>
                    <th>NO.</th>
                    <th scope="col" className="stamp_code">탬플릿 코드</th>
                    <th scope="col">탬플릿명</th>
                    <th scope="col">등록일</th>
                    <th scope="col">상태</th>
                    </tr>
                </thead>
                <tbody>
                  {list.map((value, index) => {
                    let date;
                    if(value.REG_DATE != null){
                      date = new Date(value.REG_DATE);
                    }

                    let status;
                    if(value.GRADE == 0){
                      status = "신청완료"
                    }else if(value.GRADE == 1){
                      status = "검수중"
                    }else if(value.GRADE == 2){
                      status = '검수완료'
                    }else if(value.GRADE == 3){
                      status = "사용가능"
                    }else if(value.GRADE == 4){
                      status = "부결"
                    }else{
                      status = "오류"
                    }

                    return (
                    <tr key={value.TALK_CODE} onClick={() => navigate({ pathname : `/template/message?tc=${value.TALK_CODE}`})}>
                        <td>{value.TALK_CODE}</td>
                        <td>{value.TEMPLATE_CODE ? value.TEMPLATE_CODE : ""}</td>
                        <td>{value.TITLE}</td>
                        <td>{date ? format(date, 'yyyy-MM-dd') : ""}</td>
                        <td>{status}</td>
                    </tr>
                    )
                  })}
                </tbody>
                </Table>
                  </>
                  :
                  <div style={{width : '100%', textAlign : 'center', marginTop : '10px', fontSize : '20px'}}>
                    조회된 스탬프가 없습니다.
                  </div>
                }
                <PageButtons currentPage={setPage} startDate={startDate} endDate={endDate} selectUse={selectUse} what={'template'} shopInfoNo={shop}/>
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

export default TemplateList;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top : 30px;
  margin-bottom : 30px;

`


const Form = styled.div`
  border : 0px solid gray; 
  border-radius : 10px;
  box-shadow: 5px 5px 10px 0px gray;
  padding : 40px;
  width : 80%;

  @media screen and (max-width: 767px){
    width : 95%;
  }
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
  flex-direction: column;
 
`

const Input = styled.input`
   height : 20px;
   text-align: end;
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
  margin-top : 10px;
  border-collapse: collapse;
  margin-bottom : 10px;
  overflow: hidden;
  border-radius: 15px;
  align-items : center;
  width : 100%;


  div {
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius : 100px;
    font-weight: bold;

  }

  th, td {
    padding : 10px;
    text-align: center;
    border : 2px solid rgb(255, 255, 255);
    font-size: 13px;

  }

  th {
    color: rgb(255, 255, 255);
    background-color: rgba(1, 78, 136, 0.9);;

  }

  td {
    padding: 7px;
    background-color: rgb(240, 240, 240);
  }

  .stamp_code {
    @media screen and (max-width: 767px){
      display : none;
    }
  }

`


const NotData = styled.div `
margin-top : 10px;
  border-collapse: collapse;
  width : 700px;
  margin-bottom : 10px;
  overflow: hidden;
  border-radius: 15px;
  align-items : center;



  div {
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius : 100px;
    font-weight: bold;

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