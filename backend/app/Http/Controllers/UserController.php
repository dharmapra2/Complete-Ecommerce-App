<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'password' => 'required',
        ]);
        //  method 1

        // if(auth()->attempt($data)){
        //     $token=auth()->user()->createToken('Token')->accessToken;
        //     return response()->json(['token'=>$token,'user'=>$data->name],200);
        // }else{
        //     return response()->json(['error'=>'Unauthorized access..'],401);
        // }

        // method 2

        $search = User::where('name', $request->name)->where('password', $request->password)->first();
        if (!is_null($search)) {
            $token = $search->createToken('Token')->accessToken;
            return response()->json(['token' => $token, 'uid' => $search->uid], 200);
        } else {
            return response()->json(['error' => 'Unauthorized access..'], 401);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return response()->json('create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|min:6|string',
            'password' => 'required|min:8',
        ]);
        //searching user for unique
        $search = User::where('name', $request->name)->get();
        if (count($search) == 0) {
            $user = User::create([
                'name' => $request['name'],
                'password' => $request['password'],
            ]);
            return response()->json(['sucess' => 'Registrtion Sucessfull..'], 200);
        } else {
            return response()->json(['warning' => 'Username is Already Present...'], 201);
        }
        return response()->json('request');
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        // return response()->json($id);
        // $search=User::where('name',$name)->where('password',$password)->first();
        // if (!is_null($search)) {
        //     return response()->json($search);
        // } else {
        //     return response()->json('Invalid');
        // }
        $user = auth()->user();
        return response()->json(['user' => $user, 200]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
