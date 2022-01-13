<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Nivel;
use App\Models\SubNivel;
use App\Models\Docente;
use App\Models\Estudiante;
use App\Models\Empresa;
use App\Models\PlanCuenta;
use App\Models\SolicitudEmpresa;
use App\Models\UnidadNegocio;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{

    public function run()
    {
        $this->call(ComunaTableSeeder::class);
        $this->call(PermissionsSeeder::class);
        $this->call(ClasificacionSeeder::class);
        $this->call(SubClasificacionSeeder::class);
        $this->call(ManualCuentaSiiSeeder::class);
        $this->call(AfpSeeder::class);
        $this->call(ParentezcoSeeder::class);
        $this->call(ImpuestoUtmSeeder::class);
        $this->call(MontoAsignacionFamiliarSeeder::class);


        $user1 = User::create([
                                'email'     => 'niqo.alonso@gmail.com',
                                'code_verification' => 'admin',
                                'estado_id'         =>  1,
                                'password'  => Hash::make('admin')
                             ]);
        $user1->assignRole(1);

        $user2 = User::create([
                                'email'     => 'yuserlybracho@gmail.com',
                                'code_verification' => 'admin',
                                'estado_id'         =>  1,
                                'password'  => Hash::make('admin')
                             ]);
        $user2->assignRole(1);

        $nivel1 = Nivel::create(['nombre' => '3°']);
        SubNivel::create(['nombre' => 'A', 'ano_generacion' => '2021', 'nivel_id' => $nivel1->id_nivel]);

        $nivel2 = Nivel::create(['nombre' => '4°']);
        SubNivel::create(['nombre' => 'A', 'ano_generacion' => '2021', 'nivel_id' => $nivel2->id_nivel]);

        $docente = User::create([
                    'email' => "jaime@correo.cl",
                    'password' => Hash::make("admin"),
                    'code_verification' => "12345",
                    'estado_id' => 1
                ]);
        $docente->assignRole(2);

        $docenteTable = Docente::create([
                'nombres' => "Jaime" ,
                'apellidos' => "Peña",
                'user_id' => $docente->id
            ]);

        $docenteTable->docentenivel()->sync([1,2]);

        $userEstudiante = User::create([
                        'email' => "maria@correo.cl",
                        'password' => Hash::make("admin"),
                        'code_verification' => "12345",
                        'estado_id' => 1,
                    ]);
        $userEstudiante->assignRole(3);

        $estudiante = Estudiante::create([
            'rut' => "11678781-4",
            'nombres' => "Maria Jose",
            'apellidos' => "Olate",
            'subnivel_id' => 1,
            'user_id' => $userEstudiante->id
            ]
        );

        $empresa = Empresa::create([
            'rut_empresa' => "11678781-4",
            'rut_representante' => "11678781-4",
            'razon_social' => "Maria Jose Alonso" ,
            'nombre_fantasia' => "Abastecimiento de Maiz",
            'celular' => 98564534,
            'correo' => "contacto@maiz.cl",
            'capital_inicial' => 900000,
            'tipoempresa_id' => 1,
            'estado_id'     =>  3,
            'direccion'     =>  'Galvarino 124, Santiago',
            'estudiante_id' => $estudiante->id_estudiante,

        ]);



        UnidadNegocio::create([
            'codigo'        =>  100,
            'nombre'        =>  "Casa Matriz",
            'empresa_id'    =>  $empresa->id_empresa,
        ]);

        $plancuenta = [13,14,15,16,17,18,19,1,2];

        for ($i=0; $i < count($plancuenta) ; $i++) {
            PlanCuenta::create([
                'empresa_id' => $empresa->id_empresa,
                'manualcuenta_id' => $plancuenta[$i]]);
        }

    }
}
