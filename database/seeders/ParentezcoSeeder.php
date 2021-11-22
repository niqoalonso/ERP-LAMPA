<?php

namespace Database\Seeders;

use App\Models\Parentezco;
use Illuminate\Database\Seeder;

class ParentezcoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Parentezco::create(['nombre'=> 'Hijo']);
        Parentezco::create(['nombre'=> 'Cónyuge']);

    }
}
