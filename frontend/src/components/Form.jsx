import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from "sweetalert2";


function Form() {
  const [data , setData] = useState([]);
  const [form , setForm] = useState({
    name:'',
    email:'',
    mobile:'',
    message:''
  })
  const [error , setError] = useState({});
  const [submitted , setSubmitted] = useState(false);

  const showData = async () => {
    const res = await axios.get("http://localhost:5000/api/get");
    console.log(res.data);
    setData(res.data);
  }

  useEffect(()=>{
    showData();
  } , []);
  const handleChange = (e) =>{
     setForm({ ...form, [e.target.name]: e.target.value });
     setError({});
  }  

  const validate = () =>{
    let newErrors = {};

    if(!form.name.trim()){
        newErrors.name="Required" 
    }

    if(!form.email){
        newErrors.email="Required"
    }

    if(!form.mobile){
        newErrors.mobile="Required"
    }else if(form.mobile.length < 10 || form.mobile.length > 10){
        newErrors.mobile="Invalid mobile number"
    }

    if(!form.email){
      newErrors.email="Required"
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){
      newErrors.email="Invalid email format"
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  }


   const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!validate()){
      return
    }
    setSubmitted(true);
    try{
        await axios.post("http://localhost:5000/api/send" , form);
        Swal.fire("Thanks for contact us !");
        setForm({
          name:'', email:'', mobile:'', message:''
        });
        setError({});
        showData();
    }catch(err){
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Something went wrong!",
        icon: "error"
      });
    }finally{
      setSubmitted(false);
    }
   }

  return (
    <>
      <div className='py-10 w-[90%] md:w-100 rounded-xl shadow-2xl mx-auto mt-10'>
        <p className='text-xl font-bold font-serif text-center'>Contact Us</p>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder='Enter Your Name'
            onChange={handleChange}
            value={form.name}
            className='p-1 rounded w-[90%] mx-5 border-2 border-gray-200 mt-7' />
            {error.name && <p className='text-red-500'>*{error.name}</p>}


             <input type="text" name="email"  placeholder='Enter Your Email'
             onChange={handleChange} 
             value={form.email}
             className='p-1 rounded w-[90%] mx-5 border-2 border-gray-200 mt-3' />
            {error.email && <p className='text-red-500'>*{error.email}</p>}
        

            <input type="text" name="mobile" placeholder='Enter Mobile No'
            onChange={handleChange}
            value={form.mobile}
            className='p-1 rounded w-[90%] mx-5 border-2 border-gray-200 mt-3' />
            {error.mobile && <p className='text-red-500'>*{error.mobile}</p>}


            <textarea name="message" rows={5} cols={10} placeholder='Your Message'
            onChange={handleChange}
            value={form.message}
            className='p-1 rounded w-[90%] mx-5 border-2 border-gray-200 mt-3'
            ></textarea>
            <button type='submit'
            disabled={submitted || Object.keys(error).length > 0}
             className={`p-1 rounded w-[90%] mx-5 mt-3 
             ${submitted || Object.keys(error).length > 0 ? 'bg-purple-200 cursor-not-allowed':'bg-purple-400 '}`}>{submitted?'Submitting':'Submit'}</button>
        </form>
      </div>

      {/* table of contacts */}
    <div className='overflow-x-auto rounded-2xl my-20 text-xl font-serif'>
      <table className='w-[90%] border-collapse rounded-2xl shadow-2xl mx-auto border border-gray-200'>
       <thead className='bg-gray-200'>
           <tr>
            <th  className='py-2'>Name</th>
            <th  className='py-2' >E-mail</th>
            <th  className='py-2' >Mobile no</th>
            <th  className='py-2' >Message</th>
           </tr>
       </thead>
       <tbody className='text-center border-t'>
        {
          data?data.map((item , index) =>{
          return (
          <tr key={index} className='bg-white py-2 hover:bg-gray-100'>
            <td  className='py-2'>{item.name}</td>
            <td  className='py-2'>{item.email}</td>
            <td  className='py-2'>{item.mobile}</td>
            <td  className='py-2'>{item.message}</td>
           </tr>
          )
          })
          :
         <tr>
          <td colSpan={4}>No Contacts found</td>
         </tr>
        }
       </tbody>
      </table>
    </div>
    </>
  )
}

export default Form