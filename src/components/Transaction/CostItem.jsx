import './CostItem.css';
import React from 'react';

const CostItem = () => {

    const costDate = new Date(2021, 2, 12);
    const costComment = "Gumuse";
    const costAmount = 4.00;
    const constCategory = "Regular Income";
    const costType = "+";
    const costBalance = "balance";

    return (
      <div className='costTable'>
      <div className='costItemStyle'>
          <div>{costDate.toISOString()}</div>
          <div>{costType}</div>
          <div>{constCategory}</div>
          <div>{costComment}</div>
          <div>${costAmount}</div>
          <div>{costBalance}</div>
            </div>
       
        <div>
                <hr></hr>
        </div>
        </div>     
 
  )
}

export default CostItem;