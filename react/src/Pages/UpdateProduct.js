import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

export default function UpdateProduct(props) {

  const {id} = useParams();

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(()=>{
    fetchdata();
  },[])

  async function fetchdata(){
    let result = await fetch("http://localhost:8000/api/product/"+id);
    result = await result.json();
    setData(result)
    setName(result.name)
    setPrice(result.price)
    setDescription(result.description)
    setFile(result.file_path)
  }

  async function updateProduct(){

    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('file_path', file);
    formData.append('price', price);
    formData.append('name', name);
    formData.append('description', description);

    let result = await fetch("http://localhost:8000/api/product", {
      method: 'POST',
      body: formData
    });
    alert('updated')
  }
  
  return (
    <div className='col-sm-6 offset-sm-3 updateContainer'>
      <br/><h1>Update Product page</h1><br/>  
      <img style={{width:187}} src={"http://localhost:8000/"+data.file_path} /><br/><br/>
      <input type="text" defaultValue={data.name} onChange={(e)=>setName(e.target.value)}/><br/><br/>
      <input type="text" defaultValue={data.price} onChange={(e)=>setPrice(e.target.value)}/><br/><br/>
      <input type="text" defaultValue={data.description} onChange={(e)=>setDescription(e.target.value)}/><br/><br/>
      <button className='btn btn-primary' onClick={updateProduct}>Update Product</button>
    </div>
  )
}
//<input className='pl-#' type="file" defaultValue={data.file_path} onChange={(e)=>setFile(e.target.files[0])}/><br/><br/>
