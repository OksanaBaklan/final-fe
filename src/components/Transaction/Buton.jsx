import './Buton.css';
import React from "react";

const Buton = (props) => {

  return (
    <div>
      <button onClick={props.onShowForm} className='Buton'></button>
    </div>

  );
};
export default Buton;