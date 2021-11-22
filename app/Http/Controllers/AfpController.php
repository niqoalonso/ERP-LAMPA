<?php

namespace App\Http\Controllers;

use App\Http\Requests\Previsiones\PrevisionesRequest;
use App\Models\Afp;
use Illuminate\Http\Request;

class AfpController extends Controller
{
    public function validarnombre($nombre)
    {
        $afp =  Afp::where('nombre', $nombre)->first();

        if($afp){
            return 1;
        }else{

            return 0;
        }
    }

    public function store(PrevisionesRequest $request)
    {
        $afp = Afp::updateOrCreate(['id_afp'=>$request->id_afp],
                                    [
                                        'nombre' => $request->nombre,
                                        'tasa_dependiente' => $request->tasa_dependiente,
                                        'sis' => $request->sis,
                                        'tasa_independiente' => $request->tasa_independiente
                                    ]);

        return $afp;
    }

    public function show(Afp $afp)
    {
        return Afp::all();
    }

    public function destroy(Afp $afp)
    {
        return $afp->delete();
    }
}
