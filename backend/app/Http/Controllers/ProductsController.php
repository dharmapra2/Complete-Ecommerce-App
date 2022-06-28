<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Products::all();
        return response()->json($data, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeProduct(Request $request)
    {
        $request->validate([
            'pname' => 'required',
            'img' => 'required|file',
            'price' => 'required',
        ]);
        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $extions = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extions;
            $file->move('upload/Products', $fileName);
            $filePath = 'upload/Products/' . $fileName;
        }
        $product = Products::create([
            'pname' => $request['pname'],
            'filePath' => $filePath,
            'category' => $request['category'],
            'price' => $request['price'],
            'desc' => $request['desc'],
        ]);
        return response()->json('Product added Sucessfully..');
    }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  \App\Models\Products  $products
    //  * @return \Illuminate\Http\Response
    //  */
    public function prodDetails($id)
    {
        $data = Products::where('pid',$id)->first();
        if ($data) {
            return response()->json($data);
        } else {
            return response()->json(['status' => 404, 'message' => 'No Product is avilable.']);
        }
        // return $id;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function edit(Products $products)
    {
        return response()->json('rgrrtg');
    }
    public function show(Products $products)
    {
        return response()->json('rgrrtg');
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Products $products)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy(Products $products)
    {
        //
    }
}
