import React, { useEffect} from "react";


const InputItem = (props) => {
    const {itemCount, id, inputListChange, buttonName, inputRef} = props;

    useEffect(() => {
        ItemInputRender();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
     
    useEffect(() => {
       ItemInputRender();
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemCount])
    
    const ItemInputRender = () => {
        let result = [];
        for(let i = 1; i < itemCount + 1; i ++){
            result.push(
                <td id={`td_item${i}`} key={i}>
                    <input
                        type="text"
                        name={`td_append${id}_input${i}`}
                        autoComplete="off"
                        placeholder={`항목${i}`}    
                        className="inputss"
                        ref = {el => (inputRef.current[[id,i]] = el)} 
                    />
                </td>
            );
        }

    
        
        return result;
        
    }

    const buttonClick = (e) => {
        e.preventDefault();
        inputListChange(e.target.name, id);
    }


    return (
        <>
            <td id="td_moblie">
                <input
                className="phonenum"
                type="text"
                name={`td_append${id}_phonenum`}
                autoComplete="off"
                placeholder="휴대전화 번호"
                ref = {el => (inputRef.current[[id,0]] = el)}
                />
            </td>
            {ItemInputRender()}
            {buttonName  === "minus" ?
                <td>
                    <button className="change_button" name={buttonName}  onClick={(e) => buttonClick(e)}>-</button>
                </td>
                :
                <td>
                    <button className="change_button" name={buttonName} onClick={(e) => buttonClick(e)}>+</button>
                </td>
            }
        </>
    );
}

export default  InputItem;
