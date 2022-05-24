import React, {useState, useEffect, useSyncExternalStore} from 'react';
import styled from 'styled-components';
import { refreshToken } from '../../utils/RefreshToken';
import Calendar from '../list/Calendar';
import axios from 'axios';
import PageButtons from './PageButtons';
import * as config from '../../../config';
import {format} from 'date-fns';
import { useNavigate, useParams } from 'react-router';


const StampDetail = ({loginCallBack}) => {

    const [loading, setLoading] = useState(false);
    
    
    const navigate = useNavigate();

    let getParameter = (key) => {
        return new URLSearchParams(window.location.search).get(key);
    }

    const [seq, setSEQ] = useState('');
    const [stampCode, setStampCode] = useState('');
    const [compDTM, setCompDTM] = useState('');
    const [endDTM, setEndDTM] = useState('');
    const [useYN, setUseYN] = useState('');
    const [userKey, setUserKey] = useState('');

    useEffect(() => {
      try{
        refreshToken(loginCallBack);
      }catch(e){
        console.log(e);
      }
    },[]);

    useEffect(() => {
      axios.post(`${config.SERVER_URL}/api/stamp/detail`, {
        SEQ : getParameter('seq'),
        STAMP_CODE :  getParameter('stampcode')
      }).then(response => {
        console.log('DATA' , response.data);

        if(response.data.result === 'NO DATA'){
          alert('접근권한이 없거나 없는 데이터입니다.');
          navigate('/stamp/list')
        }
        if(response.data.result === 'SUCCESS'){
          console.log(response.data.stampDetail)
          const detail = response.data.stampDetail;
          setSEQ(detail.SEQ);
          setStampCode(detail.STAMP_CODE);
          setCompDTM(format(detail.STAMP_COMP_DTM, 'yyyy-MM-dd HH:mm'));
          setEndDTM(format(detail.STAMP_END_DTM, 'yyyy-MM-dd'));
          setUseYN(detail.STAMP_USE_YN);
          setUserKey(detail.USER_KEY);
          console.log(useYN);
          setLoading(true);
        }else{
          navigate('/login');
        }
        
      })
    }, [])

    const checkUse = (e) => {
      setUseYN(e.target.value);
    }

    const updateStamp = () => {
      axios.post(`${config.SERVER_URL}/api/stamp/update`, {
        SEQ : seq,
        STAMP_CODE : stampCode,
        STAMP_USE_YN : useYN

      }).then(response => {
        const status = response.data.result;
        if(status === 'SUCCESS'){
          alert('수정완료')
          window.location.reload();
        }else{
          alert('수정실패')
          window.location.reload();
        }
      })

    }


    if(loading === true){
      return (
        <Wrapper>
            <Form>
               <Title>스탬프 조회 및 수정</Title>
               <Contents>
                <Table>
                     <tbody>
                        <tr>
                          <th>발행번호</th>
                          <td>{seq}</td>
                        </tr>
                        <tr>
                          <th>사용자</th>
                          <td>{userKey}</td>
                        </tr>
                        <tr>
                          <th>발행일자</th>
                          <td>{compDTM}</td>
                        </tr>
                        <tr>
                          <th>만료일자</th>
                          <td>{endDTM}</td>
                        </tr>
                        <tr>
                          <th>사용여부</th>
                          <td>
                              사용<input type="radio" name="use_yn" value="Y" checked={useYN === 'Y'} onChange={(e) => checkUse(e)}/> 
                              &nbsp;&nbsp;&nbsp; 미사용<input type="radio" name="use_yn" value="N" checked={useYN === 'N'} onChange={(e) => checkUse(e)}/>
                          </td>
                        </tr>
            
                        <tr>
                          <td colSpan={3} style={{textAlign : 'right'}}>
                              
                          </td>
                        </tr>
                     </tbody>
                   </Table>
                   </Contents>
                   <div style={{width : '100%', textAlign : 'end' , marginTop : '10px'}}> 
                    <Button style={{backgroundColor : 'rgba(1, 78, 136, 0.9)' }} onClick={() => updateStamp()}>수정</Button>
                    <Button style={{ backgroundColor : 'rgba(150, 150, 150, 0.9)', marginRight : '30px'}} onClick={()=> navigate('/stamp/list')}>확인</Button>
                   </div>
            </Form>
        </Wrapper>
      );
    }else{
      return (
        <Wrapper>
            <Form>
            loading.....
            </Form>
        </Wrapper>
      )
    }

};

export default StampDetail;

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
  padding : 10px;
    max-width : 600px;
  width : 80%;

  @media screen and (max-width: 767px){
    width : 80%;
  }
`

const Title = styled.div`
  font-size : 30px;
  color : rgba(1, 78, 136, 0.9);
  font-weight: 800;

`

const Contents = styled.div`
  margin : 30px 30px 0px 30px;
  display : flex;
  flex-direction: column;
  border: 2px solid rgb(240,240,240);
  border-radius: 5px;
 
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
`

const Button = styled.button`
  max-width : 50px;
  margin-left : 5px;
  margin-right : 5px;
  height : 25px;
  align-self: flex-end;

  border-radius: 4px;
  font-size : 15px;
  outline: 0;
  border: 0px ;
  color : rgba(255,255,255);

  &:hover {
    cursor:pointer;
  }
`