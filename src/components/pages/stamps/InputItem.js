import React, { useEffect } from "react";

const InputItem = (props) => {
    const {itemCount, id, inputListChange, buttonName} = props;

    useEffect(() => {
        ItemInputRender();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
     
    useEffect(() => {
       ItemInputRender();
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemCount])
    
    const ItemInputRender = () => {
        const result = [<td className="phonenumber"><input/></td>];

        for(let i = 1; i < itemCount + 1; i ++){
            result.push(<td className='item' id={`item${i}`}><input/></td>)
        }

        if(buttonName === "minus"){
            result.push(<button className="change_button" name={buttonName}  onClick={(e) => buttonClick(e)}>-</button>)
        }else if(buttonName === "plus"){
            result.push(<button className="change_button" name={buttonName} onClick={(e) => buttonClick(e)}>+</button>)
        }
        
        return result;
        
    }

    const buttonClick = (e) => {
        inputListChange(e.target.name, id);
    }


    return (
            <tr key={id}>
                {ItemInputRender()}
            </tr>
    )
}

export default  InputItem;
