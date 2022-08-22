import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../auth/RefreshToken';
import axios from 'axios';
import PageButtons from '../../utils/PageButtons';
import * as config from '../../../config';
import { useNavigate } from 'react-router';
import Spinner from 'react-spinkit';


const AccountList = ({loginCallBack}) => {
    const [page, setPage] = useState(1);
    const [accountList, setAccountList] = useState([]);
    // const [startDate, setStartDate] = useState(0);
    // const [endDate, setEndDate] = useState(0);
    // const [selectUse, setSelectUse] = useState('all');
    const startDate = 0;
    const endDate = 0;
    const selectUse = 'all';
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
      async function getAccountList(){
        const data = {
          page : page
        }
        try {
          await axios.post(`${config.SERVER_URL}/api/get/accountList`, JSON.stringify(data), {
            headers: {
              "Content-Type": `application/json`,
            },
        })
          .then(res => {
            const {accountList , result} = res.data;
            if(result === "TOKEN ERROR"){
              navigate("/login")
            }
            if(result === "TOKEN EXPIRED"){
              alert("로그인 만료 다시 로그인해주세요.");
              navigate("/login")
            }

            if(result === "SUCCESS"){
              if(accountList != null){
                setAccountList(accountList);
              }
    
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
  
      getAccountList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


        
    useEffect(() => {
      try{
        refreshToken(loginCallBack);
      }catch(e){
        console.log(e);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page, startDate, endDate, selectUse]);
    
    useEffect(() => {
      async function getAccountList(){
        const data = {
          page : page
        }
        try {
          await axios.post(`${config.SERVER_URL}/api/get/accountList`, JSON.stringify(data), {
            headers: {
              "Content-Type": `application/json`,
            },
        })
          .then(res => {
            const {accountList , result} = res.data;
            if(result === "TOKEN ERROR"){
              navigate("/login")
            }
            if(result === "TOKEN EXPIRED"){
              alert("로그인 만료 다시 로그인해주세요.");
              navigate("/login")
            }

            if(result === "SUCCESS"){
              if(accountList != null){
                setAccountList(accountList);
              }
    
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
  
      getAccountList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
  
    useEffect(() => {
      axios.post(`${config.SERVER_URL}/api/stamp/board`, {
        page : page,
        startDate : startDate,
        endDate : endDate,
        selectUse : selectUse,
      }).then(response => {
       if(response.data.stampList != null){
        //setList(response.data.stampList)

       }

        setLoading(true);

      })
    }, [page, startDate, endDate, selectUse])
  

    if(loading === true){
      return (
        <Wrapper>
            <Form>
               <Title>계정 관리</Title>
               <Contents>
               <div style={{flex : '1', textAlign : 'right'}}>    
                  <Button onClick={() => navigate({ pathname : `/account/create`})}>
                  계정등록
                  </Button>
                </div>
                 {accountList.length > 0 ?
                 <>
                
                <Table>
                <thead>
                    <tr>
                    <th scope="col">플러스 친구</th>
                    <th scope="col">사업자등록번호(ID)</th>
                    <th scope="col">CEONAME</th>
                    <th scope="col">가맹점 수<PlusButton onClick={() => navigate({ pathname : `/account/shop/create`})}>+</PlusButton></th>
                    <th scope="col">탬플릿 수<PlusButton onClick={() => navigate({ pathname : `/template/manager`})}>+</PlusButton></th>
                    </tr>
                </thead>
                <tbody>
                  {accountList.map((value, index) => {
                    return (
                      <tr key={value.BIZNO} >
                        <td>{value.PLUS_ID}</td>
                        <td>{value.BIZNO}</td>
                        <td>{value.CEONAME}</td>
                        <td className="shopCount"><span onClick={() => value.SHOP_COUNT > 0 ? navigate({ pathname : `/account/shop/update?bizno=${value.BIZNO}`}) : null }>{value.SHOP_COUNT || 0}</span></td>
                        <td className="templateCount" ><span onClick={() => value.TEMPLATE_COUNT > 0 ? navigate({ pathname : `/template/update?bizno=${value.BIZNO}`}): null}>{value.TEMPLATE_COUNT || 0}</span></td>
                      </tr>
                    )
                  })

                }

                   
                </tbody>
                </Table>
                  </>
                  :
                  <div style={{width : '100%', textAlign : 'center', marginTop : '10px', fontSize : '20px'}}>
                    조회된 스탬프가 없습니다.
                  </div>
                }
                <PageButtons currentPage={setPage} what={'account'} />
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

export default AccountList;


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
  /* @media screen and (max-width: 767px){
    width : 95%;
  } */
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
const Button = styled.button`
  border : 0;
  border-radius : 3px;
  background-color: rgba(30, 108, 166, 0.9);
  color : white;
  font-size : 14px;
  padding : 3px 5px 3px 5px;
  font-weight : 600;
  transition: 0.5s;
  :hover {
   background-color : #714DDA;
  }
  cursor: pointer;  
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


  /* .stamp_code {
    @media screen and (max-width: 767px){
      display : none;
    }
  } */

 .templateCount span, .shopCount span {
    text-decoration : underline;
  }
  .shopCount span:hover{
    cursor : pointer;
  }
  .templateCount span:hover{
    cursor : pointer;
  }
`



const PlusButton = styled.button`
  width : 20px;
  height: 20px;
  font-size : 12px;
  text-align : center;
  margin-left : 10px;
  border-radius : 22px;
  border : 0px;
  background-color : white;

  :hover {
    cursor : pointer;
  }
`