import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'

export default function ProductList() {

    const [data, setData] = useState([]);
    const [type, setType] = useState("name");
    const [key, setKey] = useState("");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    //const [price, setPrice] = useState([]);

    useEffect(()=>{
        fetchData();
    },[])

    // useEffect(()=>{
    //     handlePrice();
    // },[min, max])

    useEffect(()=>{
        search();
    },[ key, max, min])

    // function handlePrice(){
    //     if (type === "price"){
    //         setPrice([])
    //         data.map((item)=>{
    //             if ( min < parseInt(item.price) && parseInt(item.price) < max ){        
    //                 // setPrice([... price, {
    //                 //     id: item.id,
    //                 //     name: item.name,
    //                 //     price: item.price,
    //                 //     description: item.description,
    //                 //     file_path: item.file_path,
    //                 // }])
    //                 console.log(item.price)
    //             }
    //         })
    //     }
    // }

    async function search(){
        if (key!==""){
            let result = await fetch("http://localhost:8000/api/search/"+key+"/"+type);
            result = await result.json();
            setData(result)
        }
        else{
            fetchData();
        }
    }

    async function handleDelete(id){
        let result = await fetch("http://localhost:8000/api/delete/"+id, {
            method: 'DELETE'
        });
        result = await result.json();
        fetchData();
    }

    async function fetchData(){
        let result = await fetch("http://localhost:8000/api/list");
        result = await result.json();
        setData(result) 
    }

    return (
        <div className='col-sm-6 offset-sm-3'>

            <br/><h1>Product List page</h1><br/>
            <div className='row'>
                <div className='col-sm-8'>

                    {type === "price" && (
                        <div className='row'>
                            <div className='col-sm-6'><input type='number' onChange={(e)=>{setMin(parseInt(e.target.value))}} className='form-control' placeholder='Min'/></div>
                            <div className='col-sm-6'><input type='number' onChange={(e)=>{setMax(parseInt(e.target.value))}} className='form-control' placeholder='Max'/></div>
                        </div>
                    )}

                    {type !== "price" && (
                        <input type='text' onChange={(e)=>{setKey(e.target.value)}} className='form-control' placeholder='Search Product'/>
                    )}

                </div>
                <div className='col-sm-4'>
                    <select className="form-select" defaultValue={"name"} onChange={(e)=>{setType(e.target.value)}}>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="description">Description</option>
                    </select>
                </div>
            </div><br/>

            <Table>
                <tfoot>
                    <tr key={0}>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operation</td>
                    </tr>

                    { type !== "price" && data.map((item)=>(
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td><img style={{width:100}} src={"http://localhost:8000/"+item.file_path } alt="" /></td>
                            <td><span onClick={()=>handleDelete(item.id)} className='delete'>Delete</span></td>
                            <td>
                                <Link to={"/update/"+item.id}><span className='update'>Update</span></Link>
                            </td>
                        </tr>
                    ))}

                    { type === "price" && data.map((item)=>(
                        (min <= parseInt(item.price) && parseInt(item.price) <= max) ? 
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img style={{width:100}} src={"http://localhost:8000/"+item.file_path } alt="" /></td>
                                <td><span onClick={()=>handleDelete(item.id)} className='delete'>Delete</span></td>
                                <td>
                                    <Link to={"/update/"+item.id}><span className='update'>Update</span></Link>
                                </td>
                            </tr>
                        : null
                    ))}

                </tfoot>
            </Table>                 
        </div>
    )
}