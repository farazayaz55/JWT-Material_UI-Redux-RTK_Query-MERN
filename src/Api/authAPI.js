// import {useState, useEffect} from 'react'
// import axios from 'axios'

// import React from 'react'

// export const authAPI = (user) => {
//   const [isLoading, setLoading] = useState(false)
//   const [isError, setError] = useState(false)
//   const [data, setData] = useState({});
//   useEffect(()=>{
//     const fetchData=async ()=>{
//         setError(false);
//         setLoading(true);
//         try{
//             const response=await axios.post("http://localhost:3000/auth/login",{...user})
//             setData(response);
//             setLoading(false);
//             setError(false);
//         }
//         catch(err){
//             alert(err)
//         }
//     }
//   },[])
//   return (
//     isLoading && <div>Loading....</div>
//   )
// }
