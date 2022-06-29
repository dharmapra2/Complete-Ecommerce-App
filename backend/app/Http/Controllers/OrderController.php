<?php

namespace App\Http\Controllers;

use App\Models\order;
use App\Models\Cart;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $order = order::where('uid', $request->uid)->get();
        return response()->json($order, 200);
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
            'orderId' => 'required',
            'order_time' => 'required',
            'orderedItems' => 'required',
            'email' => 'required|email',
            'price' => 'required',
            'uid' => 'required',
            'full_name' => 'required|string',
        ]);
        $search = order::where('uid', $request->uid)->where('orderId', $request->orderId)->get();
        if (count($search) == 0) {
            $order = order::create([
                'orderId' => $request['orderId'],
                'order_time' => $request['order_time'],
                'orderedItems' => $request['orderedItems'],
                'email' => $request['email'],
                'uid' => $request['uid'],
                'price' => $request['price'],
                'full_name' => $request['full_name'],
            ]);
            if ($order) {
                $cart = Cart::where('uid', $request->uid)->delete();
                return response()->json(['success' => 'Your order successfully placed.'], 200);
            } else {
                return response()->json(['error' => 'Sorry, Your order can\'t be palced right now.'], 401);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(order $order)
    {
        //
    }
}
