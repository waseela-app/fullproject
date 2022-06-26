import React, {useState} from 'react'

export default function AddProduct() {

  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function addProduct(){

    let pricePass = /^\d+$/.test(price)

    if ( name !=='' && file !=='' && description !=='' && price !=='' && pricePass){
      const formData = new FormData();
      formData.append('file', file);
      formData.append('price', price);
      formData.append('name', name);
      formData.append('description', description);

      let result = await fetch("http://localhost:8000/api/addproduct", {
        method: 'POST',
        body: formData
      });
      alert('saved')
    }

    else if (!pricePass){ alert('Price must be a real number') }

    else{ alert('must fill all inputs') }
  }

  return (
    <div className='col-sm-6 offset-sm-3'>
      <br/><h1>Add Product page</h1><br/>
      <input type='text' className='form-control' placeholder='name' onChange={(e)=>setName(e.target.value)}/><br/>
      <input type='file' className='form-control' placeholder='file' onChange={(e)=>setFile(e.target.files[0])}/><br/>  
      <input type='text' className='form-control' placeholder='price' onChange={(e)=>setPrice(e.target.value)}/><br/>  
      <input type='text' className='form-control' placeholder='description' onChange={(e)=>setDescription(e.target.value)}/><br/>
      <button onClick={addProduct} className='btn btn-primary'>Add Product</button>  
    </div>
  )
}