<?php

namespace App\Http\Controllers;

use App\Models\Nivel;
use Illuminate\Http\Request;

class NivelController extends Controller
{

    public function index()
    {
        //
    }


    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }


    public function show()
    {
       return Nivel::all();
    }


    public function edit(Nivel $nivel)
    {
        //
    }


    public function update(Request $request, Nivel $nivel)
    {
        //
    }


    public function destroy(Nivel $nivel)
    {
        //
    }
}
