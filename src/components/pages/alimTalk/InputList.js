import React, {useEffect, useState} from 'react';
import InputItem from './InputItem';


const InputList = ({itemCount, inputRef}) => {
    const [inputList , setInputList] = useState([]);
    
    useEffect(() => {
        setInputList([
            {
                itemCount : itemCount,
                id : 0,
            }
        ])

        
    }, [itemCount])

    const inputListChange = (name, id) => {
        console.log(inputList.length);
        if(inputList.length === 5 && name === 'plus'){
            alert('단일업로드는 최대 5개까지 가능합니다.')
            return;
        }
        if(name === "plus"){
            setInputList([
                ...inputList,
                {
                    itemCount : itemCount,
                    id : inputList[inputList.length - 1].id + 1
                }
            ])
        }else if(name === "minus"){
            console.log(id);
            setInputList(inputList.filter((value) => value.id !== id));
        }

        

    }

    const ItemNameRender = () => {
        const result = [];

        
        for(let i = 1; i < itemCount + 1; i ++){
            result.push(<th key={i} className="item_title">항목{i}</th>)
        }
        
        return result;
    }



    return (
        <>
            <thead>
            <tr>
                <th className="phone_title">핸드폰 번호</th>
                {ItemNameRender()}
            </tr> 
            </thead>
            <tbody id="tbody">  
            {
                inputList.map((value, index) => {
                    return (
                        <tr id={`td_append${value.id}`} key={index} className="td_append">
                             <InputItem 
                                inputRef = {inputRef}
                                itemCount={value.itemCount} 
                                id={value.id} 
                                inputListChange={inputListChange} 
                                buttonName={index !== inputList.length -1 ? "minus" : "plus"}
                            /> 
                        </tr>
                    )
                })
            }
            </tbody>
        </>
    )
}

export default  InputList;