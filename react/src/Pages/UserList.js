import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'

export default function UserList() {

    const [data, setData] = useState([]);
    const [type, setType] = useState("name");

    useEffect(()=>{
        fetchData();
    },[])

    async function fetchData(){
        let result = await fetch("http://localhost:8000/api/users");
        result = await result.json();
        setData(result) 
    }

    async function search(key){
        if (key!==""){
            let result = await fetch("http://localhost:8000/api/searchuser/"+key+"/"+type);
            result = await result.json();
            setData(result)
        }
        else{
            fetchData();
        }
    }

    async function handleDelete(id){
        let result = await fetch("http://localhost:8000/api/deleteuser/"+id, {
            method: 'DELETE'
        });
        result = await result.json();
        fetchData();
    }

  return (
    <div className='col-sm-6 offset-sm-3'>
    <br/><h1>User List page</h1><br/>
    <div className='row'>
        <div className='col-sm-8 p-0'>
            <input type='text' onChange={(e)=>search(e.target.value)} className='form-control' placeholder='Search Product'/><br/>
        </div>
        <div className='col-sm-4'>
            <select className="form-select" defaultValue={"name"} onChange={(e)=>{setType(e.target.value)}}>
                <option value="name">Name</option>
                <option value="email">Email</option>
            </select>
        </div>
      </div>
      
    <Table>
              <tfoot>
                  <tr key={0}>
                      <td>Id</td>
                      <td>Name</td>
                      <td>Email</td>
                      <td>Operation</td>
                  </tr>
                  { data.map((item)=>
                      <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td><span onClick={()=>handleDelete(item.id)} className='delete'>Delete</span></td>
                      </tr>
                  )}
              </tfoot>
          </Table>
  </div>
  )
}