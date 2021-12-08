<?php

namespace Database\Seeders;

use App\Models\ImpuestoUtm;
use Illuminate\Database\Seeder;

class ImpuestoUtmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ImpuestoUtm::create(['desde' => 0.00, 'hasta' => 13.5, 'factor' => 0, 'rebaja' => 0.00]);
        ImpuestoUtm::create(['desde' => 13.5, 'hasta' => 30, 'factor' => 4, 'rebaja' => 0.54]);
        ImpuestoUtm::create(['desde' => 30, 'hasta' => 50, 'factor' => 8, 'rebaja' => 1.74]);
        ImpuestoUtm::create(['desde' => 50, 'hasta' => 70, 'factor' => 13.50, 'rebaja' => 4.49]);
        ImpuestoUtm::create(['desde' => 70, 'hasta' => 90, 'factor' => 23, 'rebaja' => 11.14]);
        ImpuestoUtm::create(['desde' => 90, 'hasta' => 120, 'factor' => 30.40, 'rebaja' => 17.8]);
        ImpuestoUtm::create(['desde' => 120, 'hasta' => 310, 'factor' => 35, 'rebaja' => 23.32]);
        ImpuestoUtm::create(['desde' => 310, 'hasta' => -1, 'factor' => 40, 'rebaja' => 38.82]);
    }
}
