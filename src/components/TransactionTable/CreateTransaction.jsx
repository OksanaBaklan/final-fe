

// import axios from 'axios'
// import React, { useState,useEffect, useContext } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { UserContext } from '../../storeContext/UserContext';
// import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction'


// export default function CreateTransaction() {
//     const { authenticated } = useContext(UserContext);
//     const [check, setCheck] = useState(false);

//     const [errorMessage, setErrorMessage] = useState("")
//     const navigate = useNavigate()
//     const { setBalance } = useContext(UserContext);

  
//     useEffect(()=>{
//       if(!authenticated) navigate("/login")
//     },[])
  
//     const {transactionId} = useParams()

//     // const [transactionDetails, setTransactionDetails] = useState({})

//     const handleSubmit = async (e) => {
//         // dispatch(addTransaction({ date, isIncome, amount, comment, categoryId }));
//         const date = Date.parse(e.target["date"].value);
    
//         e.preventDefault();
    
//         const newTransaction = {
//           isIncome: !check,
//           categoryId:
//             e.target["categoryId"] === undefined
//               ? "321344421"
//               : e.target["categoryId"].value,
//           amount: e.target["amount"].value,
//           date: date,
//           comment: e.target["comment"].value,
//         };
//         const token = JSON.parse(localStorage.getItem("my-app-token"));
    
//         // console.log(newTransaction.categoryId);
    
//         try {
//           const response = await axios.post(
//             `http://localhost:5555/api/transactions/`,
//             newTransaction,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             },
//           );
//           e.target.reset();
//           console.log(response.data.balance);
//           setBalance(response.data.balance);
//           // navigate("/table")
//         } catch (err) {
//           setErrorMessage(err.request.response);
//         }
//       };
    
//       const checkHandler = (e)=> setCheck(e.target.checked)

//     return(
//         <>
//         <h1>CreateTransaction</h1>
//         <ModalAddTransaction submitHandler={handleSubmit} checkHandler={checkHandler}  check={check}/>
//         </>
//     )
// }