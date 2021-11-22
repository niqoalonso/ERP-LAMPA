<?php

namespace App\Http\Controllers;

use App\Models\TipoEmpresa;
use Illuminate\Http\Request;

class TipoEmpresaController extends Controller
{

    public function index()
    {
        //
    }


    public function show(TipoEmpresa $tipoEmpresa)
    {
        return TipoEmpresa::all();
    }

}
