<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImpuestoUtm\ImpuestoUtmRequest;
use App\Models\ImpuestoUtm;
use Illuminate\Http\Request;

class ImpuestoUtmController extends Controller
{

    public function store(ImpuestoUtmRequest $request)
    {
        $impuesto = ImpuestoUtm::updateOrCreate(['id_impuesto_utm'=>$request->id_impuesto_utm],
                                    [
                                        'desde' => $request->desde,
                                        'hasta' => $request->hasta,
                                        'factor' => $request->factor,
                                        'rebaja' => $request->rebaja
                                    ]);

        return $impuesto;
    }

    public function show()
    {
        return ImpuestoUtm::all();
    }

    public function destroy(ImpuestoUtm $impuestoutm)
    {
        return $impuestoutm->delete();
    }
}
