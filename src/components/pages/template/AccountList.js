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
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [selectUse, setSelectUse] = useState('all');
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
        console.log(data);
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
                        <td className="shopCount"><a onClick={() => value.SHOP_COUNT > 0 ?navigate({ pathname : `/account/shop/update?bizno=${value.BIZNO}`}) : null }>{value.SHOP_COUNT || 0}</a></td>
                        <td className="templateCount" ><a onClick={() => value.TEMPLATE_COUNT > 0 ? navigate({ pathname : `/template/update?bizno=${value.BIZNO}`}): null}>{value.TEMPLATE_COUNT || 0}</a></td>
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
   background-color : rgba(1, 78, 136, 0.9);
  }
  cursor: pointer;  
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

 .templateCount a, .shopCount a {
    text-decoration : underline;
  }
  .shopCount a:hover{
    cursor : pointer;
  }
  .templateCount a:hover{
    cursor : pointer;
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