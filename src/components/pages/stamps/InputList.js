import React, {useEffect, useState} from 'react';
import InputItem from './InputItem';


const InputList = ({itemCount, onClick}) => {
    const [inputList , setInputList] = useState([
        {
            itemCount : itemCount,
            id : 0
        }
    ]);
    
    useEffect(() => {


        
    }, [inputList])
    const inputListChange = (name, id) => {
        if(name === "plus"){
            setInputList([
                ...inputList,
                {
                    itemCount : itemCount,
                    id : inputList[inputList.length - 1].id + 1
                }
            ])
        }else if(name === "minus"){
            setInputList(inputList.filter((value) => value.id !== id));
        }

    }

    const ItemNameRender = () => {
        const result = [];

        
        for(let i = 1; i < itemCount + 1; i ++){
            result.push(<th className="item_title">항목{i}</th>)
        }
        
        return result;
    }

    // const ItemInputRender = () => {
    //     const result = [];

        
    //     for(let i = 1; i < itemCount + 1; i ++){
    //         result.push(<th className="item_title">항목{i}</th>)
    //     }
        
    //     return result;
    // }





    return (
        <table>
            <tr>
                <th className="phone_title">핸드폰 번호</th>
                {ItemNameRender()}
            </tr>
            <tr>
                
            </tr>
            {
                inputList.map((value, index) => {
                    return (
                        <>
                            <InputItem itemCount={value.itemCount} id={value.id} inputListChange={inputListChange} buttonName={index !== inputList.length -1 ? "minus" : "plus"}/>
                        </>
                        
                    )
                })
            }
        </table>

    )
}

export default  InputList;