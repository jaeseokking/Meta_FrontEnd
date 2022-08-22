import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../auth/RefreshToken';
import axios from 'axios';
import PageButtons from '../../utils/PageButtons';
import * as config from '../../../config';
import {format} from 'date-fns';
import { useNavigate } from 'react-router';
import Spinner from 'react-spinkit';


const TemplateList = ({loginCallBack}) => {
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    // const [startDate, setStartDate] = useState(0);
    // const [endDate, setEndDate] = useState(0);
    // const [selectUse, setSelectUse] = useState('all');
    const startDate = 0;
    const endDate = 0;
    const selectUse = 'all';
    const [shopList, setShopList] = useState([]);
    const [shop, setShop] = useState('');

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      setLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
              if(shopList.length < 1){
                alert("등록된 가맹점이 없습니다. 가맹점을 등록해주세요.")
                navigate('/info/shop/create');          
              }
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    if(value.GRADE === 0){
                      status = "신청완료"
                    }else if(value.GRADE === 1){
                      status = "검수중"
                    }else if(value.GRADE === 2){
                      status = '검수완료'
                    }else if(value.GRADE === 3){
                      status = "사용가능"
                    }else if(value.GRADE === 4){
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
  width : 1000px;
  background-color: white;
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
  flex-direction: column;
 
`


const Table = styled.table`
  margin-top : 10px;
  border-collapse: collapse;
  margin-bottom : 10px;
  overflow: hidden;
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
    font-size: 15px;
    height : 35px;
    border-bottom : 1px solid #aeaeae;

  }

  td:first-child{
    border-left : 0px;
  }

  th:first-child{
    border-left : 0px;
  }

  th {
    background-color: #F5F2F4;
    border-top: 1px solid black;
    border-left : 1px solid #aeaeae;
    font-family: 'SCDream_Bold';


  }

  td {
    padding: 7px;
    border-left : 1px solid #aeaeae;
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