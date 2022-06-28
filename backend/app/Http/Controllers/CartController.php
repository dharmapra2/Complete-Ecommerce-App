<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data=Cart::where('uid',$request->uid)->get();
        return response()->json($data);
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
    public function store(Request $request)
    {
        $request->validate([
            'uid'=>'required',
            'pid'=>'required',
            'pname'=>'required',
            'qty'=>'required|min:1|max:10',
            'price'=>'required',
        ]);
        //searching Cart for unique
        $search=Cart::where('uid',$request->uid)->where('pid',$request->pid)->get();
        if (count($search) == 0) {
            $Cart= Cart::create([
                'uid'=>$request['uid'],
                'pid'=>$request['pid'],
                'pname'=>$request['pname'],
                'qty'=>$request['qty'],
                'price'=>$request['price'],
            ]);
            return response()->json(['sucess'=>'Product is added Sucessfull..'],200);
        } else {
            return response()->json(['warning'=>'Product is Already added to cart...'],201);
        }
        return response()->json('request');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
