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


const StampList = ({loginCallBack}) => {
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
            if(result === "SUCCESS"){
              setShopList(shopList);
              setShop(shopList[0].SHOP_INFO_NO);       
    
            }
            if(result === "TOKEN EXPIRED"){
              alert("로그인 만료 다시 로그인해주세요.");
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    useEffect(() => {

      async function getBoard(){
        await axios.post(`${config.SERVER_URL}/api/stamp/board`, {
          page : page,
          startDate : startDate,
          endDate : endDate,
          selectUse : selectUse,
          shop_info_no : shop,
        }).then(response => {
         if(response.data.stampList != null){
          setList(response.data.stampList)
  
         }
  
          setLoading(true);
  
        })
      }
    
      getBoard();

    }, [page, startDate, endDate, selectUse, shop])
  
    function selectShop(e){
      setShop(e.target.value);
    }

    if(loading === true){
      return (
        <Wrapper>
            <Form>
               <Title>스탬프 조회
               <div style={{flex : '1', textAlign : 'right'}}>   
               {shopList ?
                <Select style={{textAlign : 'center'}} onChange={e => selectShop(e)}>
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
               <SearchForm>
                        <Calendar startDate={setStartDate} endDate={setEndDate} currentPage={setPage} selectUse={setSelectUse}/>     
                </SearchForm>
                 {list.length > 0 ?
                 <>
                
                <Table>
                <thead>
                    <tr>
                    <th>발행번호</th>
                    <th scope="col" className="stamp_code">스탬프 코드</th>
                    <th scope="col">발행일자</th>
                    <th scope="col">유효일자</th>
                    <th scope="col">스탬프 개수</th>
                    <th scope="col" style={{width : '70px'}}>사용유무</th>
                    </tr>
                </thead>
                <tbody>
                {list.length > 0 && list.map((value, index) => {
                    const COMP_DTM = new Date(value.STAMP_COMP_DTM);
                    let END_CTM = "";
                    if(value.STAMP_END_DTM != null){
                       END_CTM = new Date(value.STAMP_END_DTM);
                    }
                    return(
                    <tr key={value.SEQ} onClick={() => navigate({ pathname : `/stamp/detail?seq=${value.SEQ}&stampcode=${value.STAMP_CODE}&type=${value.STAMP_TYPE}`})}>
                      <td>{value.SEQ}</td>
                                                                                    <td className="stamp_code">{value.STAMP_CODE}</td>
                      <td>{format(COMP_DTM, 'yyyy-MM-dd HH:mm')}</td>
                      <td>{END_CTM ? format(END_CTM, 'yyyy-MM-dd') : ""}</td>
                      <td>{value.STAMP_CNT}</td>
                      <td style={{width : 58}}><div><div style={{background : value.STAMP_USE_YN === "N" ? 'rgba(28, 200, 93, 1)' : '#d12', color : '#fff' , width : 20}}>{value.STAMP_USE_YN}</div></div></td>
                    </tr> 
                    );
                  })}
                </tbody>
                </Table>
                  </>
                  :
                  <div style={{width : '100%', textAlign : 'center', marginTop : '10px', fontSize : '20px'}}>
                    조회된 스탬프가 없습니다.
                  </div>
                }
                {list.length > 0 &&
                <PageButtons currentPage={setPage} startDate={startDate} endDate={endDate} selectUse={selectUse} what={'stamp'} shopInfoNo={shop}/>
                }
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

export default StampList;

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
  transition : 0.4s;

  button {
    &:hover {
    cursor:pointer;
    transition : 0.4s;
    border-radius: 20px;
    }
  }
 
`



const SearchForm = styled.div`
    display : flex;
    align-items: center;
    align-self : end;
    justify-content: center;
    width : '100%';
/*   
    @media screen and (max-width: 767px){
        display: inline-block;
        align-items: center;
        align-self : end;
        justify-content: flex-end;
    } */

`



const Table = styled.table`
  margin-top : 10px;
  border-collapse: collapse;
  margin-bottom : 10px;
  overflow: hidden;
  align-items : center;
  width : 100%;
  font-family: 'SCDream';



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

  /* .stamp_code {
    @media screen and (max-width: 767px){
      display : none;
    }
  } */

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
  cursor: pointer;
  
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  font-family: inherit;
`

