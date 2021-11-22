<?php

namespace App\Http\Controllers;

use App\Models\RegimenTributario;
use Illuminate\Http\Request;

class RegimenTributarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RegimenTributario  $regimenTributario
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return RegimenTributario::all();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RegimenTributario  $regimenTributario
     * @return \Illuminate\Http\Response
     */
    public function edit(RegimenTributario $regimenTributario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RegimenTributario  $regimenTributario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RegimenTributario $regimenTributario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RegimenTributario  $regimenTributario
     * @return \Illuminate\Http\Response
     */
    public function destroy(RegimenTributario $regimenTributario)
    {
        //
    }
}
