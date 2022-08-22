import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as config from '../../../config'


function PageButtons({shop_bizno, currentPage, startDate, endDate, selectUse}) {
	  const [selectPage, setSelectPage] = useState(currentPage); 
    const [totalcounts, setTot] = useState();

    const [index, setIndex] = useState(0);

    //시작날짜와 끝날짜, 사용유무를 선택 변경할 경우 시작페이지와 인덱스 변경
    useEffect(() => {
      setSelectPage(1)
      setIndex(0)
    }, [startDate, endDate, selectUse])


  
    //초기 렌더링시 전체의 갯수를 가져옴
    var pageNumber = [];
    useEffect(() => {
        axios.post(`${config.SERVER_URL}/api/board/counts`, {
            shop_bizno : shop_bizno,
            startDate : startDate,
            endDate: endDate,
            selectUse : selectUse
        }).then(response => {
            setTot(response.data)
        })   
      }, [])

      //시작날짜와 끝날짜, 사용유무를 선택 변경할 경우 페이지 갯수 가져옴
      useEffect(() => {
        axios.post(`${config.SERVER_URL}/api/board/counts`, {
            shop_bizno : shop_bizno,
            startDate : startDate,
            endDate: endDate,
            selectUse : selectUse
        }).then(response => {
            setTot(response.data)
        })   
      }, [startDate, endDate, selectUse])

    //총 페이지를 한페이지에 10개씩 보여줌 
    var count = Math.ceil(totalcounts/10)
    //10개씩 나눈 페이지를 5개씩 페이징함 
    var length = Math.ceil(count/5)

    //페이지 번호 매기기
    for(let i = 1 ; i <= count ; i = i + 1){
        pageNumber.push(i);
    }
 
    function Prev(e){
      e.preventDefault()
      setIndex(index -1)
    }

    function Next(e){
      e.preventDefault()
      setIndex(index + 1)
    }

    useEffect(() => {
      if(index !== 0){
        currentPage((index * 5) + 1)
        setSelectPage((index * 5) + 1)

      }else{
        currentPage(1)
        setSelectPage(1)

      }
    }, [index])

    function SetPage(value){
      currentPage(value)
      setSelectPage(value)
      
    }


    return (
        <Wrapper>
              <PageBtnContainer>

                {index !== 0 ?
                  <PrevPage onClick={(e)=> Prev(e)}/>
                  :
                  <PrevPage/>
                }   
                <Form>
                  {/* pageNumber : 총개시글수/10 한 것을 넘버링, 페이이넘버를 페이징 5개씩  */}
                  {pageNumber.slice(index * 5, (index + 1) * 5).map((value) => (
                      <PageBtn key={value} onClick={() => SetPage(value)} style={selectPage === value ? {fontSize : "20px"} : null}>{value}</PageBtn>
                  ))} 
                </Form>     
                {index + 1 < length && length !== 0 && length !== 1 ?  
                  <NextPage onClick={(e)=> Next(e)}/>
                  :
                  <NextPage/>
                }
            </PageBtnContainer>

            <PageRange>총 세차권 {totalcounts}개  &nbsp; {count !== 0 ? selectPage : 0} / {count} 페이지</PageRange>
            {/* <AdditionalFee>추가 수수료가 부과됩니다. 세금도 부과될 수 있습니다.</AdditionalFee> */}
        </Wrapper>

    );
}

export default PageButtons;


const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background : '#123123';
  flex-direction : column;  
`;


const PageBtn = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 0 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: ;
  
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const NextPage = styled(PageBtn)`
  margin: 0 16px;
  position: relative;
  border-radius: 50%;
  cursor: pointer;
  background: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 26%;
    height: 4%;
    top: 41%;
    left: 52%;
    background: #000;
    z-index: 2;
    transform: translate(-50%, -50%) rotate(45deg);
    transition: all 0.2s linear;
  }

  &::after {
    z-index: 3;
    top: 59%;
    left: 52%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const PrevPage = styled(NextPage)`
  transform: rotate(180deg);
`;

const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background : '#123123';
  flex-direction : row;  
`

const PageBtnContainer = styled.div`
  display : flex;
  margin-bottom: 2px;
  flex-direction : row;
`;

const PageRange = styled.div`
  margin: 4px;
  font-size: ${props => props.theme.fontSizeSmall};
  font-weight: ${props => props.theme.fontWeightMedium};
`;
