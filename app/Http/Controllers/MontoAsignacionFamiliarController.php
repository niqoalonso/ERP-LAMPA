<?php

namespace App\Http\Controllers;

use App\Models\MontoAsignacionFamiliar;
use Illuminate\Http\Request;

class MontoAsignacionFamiliarController extends Controller
{
    public function show()
    {
        return MontoAsignacionFamiliar::all();
    }
}
