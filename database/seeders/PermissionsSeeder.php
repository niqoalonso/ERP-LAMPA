<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsSeeder extends Seeder
{

    public function run()
    {
        Permission::create(['name' => 'Crear Docente']);//1          - Administrador
        Permission::create(['name' => 'Editar Docente']); //2          - Adminsitrador
        Permission::create(['name' => 'Listar Docente']); //3         - Administrador
        Permission::create(['name' => 'Eliminar Docente']); //4       - Administrador
        Permission::create(['name' => 'Activar Docente']); //5          - Administrador
        Permission::create(['name' => 'Solicitud Empresa']); //6       - Administrador
        Permission::create(['name' => 'Solicitud Inicio Actividad']); //7   - Administrador

        Permission::create(['name' => 'Crear SubNivel']); //8               - Administrador
        Permission::create(['name' => 'Editar SubNivel']);//9               - Administrador
        Permission::create(['name' => 'Listar SubNivel']);//10              - Administrador
        Permission::create(['name' => 'Eliminar SubNivel']);//11            - Administrador
        Permission::create(['name' => 'Activar SubNivel']);//12             - Administrador

        Permission::create(['name' => 'Crear Estudiante']);//13             - Administrador - Docente
        Permission::create(['name' => 'Editar Estudiante']);//14            - Administrador - Docente
        Permission::create(['name' => 'Listar Estudiante']);//15            - Administrador - Docente
        Permission::create(['name' => 'Activar Estudiante']);//16           - Administrador - Docente

        Permission::create(['name' => 'Crear Act. Economica']);//17         - Administrador - Docente
        Permission::create(['name' => 'Editar Act. Economica']);//18        - Administrador - Docente
        Permission::create(['name' => 'Listar Act. Economica']);//19        - Administrador - Docente
        Permission::create(['name' => 'Eliminar Act. Economica']);//20      - Administrador - Docente

        Permission::create(['name' => 'Crear Proveedor']);//21              - Administrador - Docente
        Permission::create(['name' => 'Editar Proveedor']);//22             - Administrador - Docente
        Permission::create(['name' => 'Listar Proveedor']);//23             - Administrador - Docente
        Permission::create(['name' => 'Eliminar Proveedor']);//24           - Administrador - Docente
        Permission::create(['name' => 'Activar Proveedor']);//25            - Administrador - Docente

        Permission::create(['name' => 'Crear Producto Proveedor']);//26     - Administrador - Docente
        Permission::create(['name' => 'Editar Producto Proveedor']);//25    - Administrador - Docente
        Permission::create(['name' => 'Listar Producto Proveedor']);//26    - Administrador - Docente
        Permission::create(['name' => 'Eliminar Producto Proveedor']);//27  - Administrador - Docente
        Permission::create(['name' => 'Activar Producto Proveedor']);//28   - Administrador - Docente

        Permission::create(['name' => 'Crear Empresa']); //29               - Estudiante
        Permission::create(['name' => 'Editar Empresa']);//30               - Estudiante

        $role = Role::create(['name' => 'Administrador']);
        $role->syncPermissions([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,27,28]);

        $role = Role::create(['name' => 'Docente']);
        $role->syncPermissions([1,2,3,4,5,6,7,13,14,15,16,17,18,19,20,21,22,23,24,25,27,28]);

        $role = Role::create(['name' => 'Estudiante']);
        // $role->syncPermissions([29,30]);
        $role->syncPermissions([31,30]);

        // modifique el id de los permisos de los estudiantes en la bd me aparecen como 31 y 32
    }
}
