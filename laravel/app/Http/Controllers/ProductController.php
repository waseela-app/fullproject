<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    function addProduct(Request $req){
        
        $product = new Product;
        $product->name = $req->input('name');
        $product->price = $req->input('price');
        $product->description = $req->input('description');
        $product->file_path = $req->file('file')->store('products');
        $product->save();
        
        return $product;
    }
    
    function update(Request $req){
    
        $product2 = Product::find($req->input('id'));
        $product2->name = $req->input('name');
        $product2->price = $req->input('price');
        $product2->description = $req->input('description');
        $product2->file_path = $req->input('file_path');
        $product2->save();
    
        return $product2;
    }

    function list(){

        return Product::all();
    }

    function delete($id){

        $result = Product::where('id',$id)->delete();

        if ($result){ return ["Deleted"=>"product has been deleted"]; }
        
        else{ return ["failed"=>"operation failed"]; }
    }

    function getProduct($id){

        return Product::find($id);
    }

    function search($key, $type){

        if ($type !== "price"){
            return Product::where($type,'Like',"%$key%")->get();
        }
        else{
            return Product::all();
        }
    }

}