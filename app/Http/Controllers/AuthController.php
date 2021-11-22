<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailRegistro;
use App\Models\Docente;
use App\Models\Estudiante;
use PhpParser\Builder\Use_;

class AuthController extends Controller
{
   public function register(Request $request){
       $input = $request->all();

        $validator =  Validator::make($input,[
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'password2' => 'required|same:password'
        ]);

        if($validator->fails()){
            return $this->errorResponse('Validacion errors', $validator->errors() ) ;
        }

        $checkEmail = User::where('email',$input["email"])->first();

        if($checkEmail){

            return $this->errorResponse('','Email Already Existed') ;

        }

        $input["password"] = bcrypt($input["password"]);
        $input["code_verification"] = sha1(time());


        $user = User::create($input);

        $user->assignRole('cliente');


        $response = [
            'name' => $user->name,
            'email' => $user->email,

        ];

        $nombre = $user->name;

        $url = 'http://127.0.0.1:8080/verificaremail/'.$user->code_verification;

        Mail::to($user->email)->send(new MailRegistro($nombre,$url));

        return $this->successResponse($response, 'User Succesfully Registered');

   }

   public function login(Request $request){

        $input = $request->all();

        $validator =  Validator::make($input,[
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return $this->errorResponse('Validacion errors', $validator->errors() ) ;
        }

        if(Auth::attempt([
            'email'=>$request->email,
            'password'=>$request->password
        ])){

            $user = Auth::user();
            $rol = $user->getRoleNames(); 

            if($rol[0] == "Estudiante"){
                $response = [
                    'token' => $user->createToken('tahuCoding')->plainTextToken,
                    'name' => $user->name,
                    'email' => $user->email,
                    'rol' => $user->getRoleNames(),
                    'empresa' => $user->estudiante[0]->empresa,
                    'permisos' => $user->getAllPermissions()
                ];
            }else{
                $response = [
                    'token' => $user->createToken('tahuCoding')->plainTextToken,
                    'name' => $user->name,
                    'email' => $user->email,
                    'rol' => $user->getRoleNames(),
                    'empresa' => null,
                    'permisos' => $user->getAllPermissions()
                ];
            }

            

            return $this->successResponse($response, 'User Succesfully Login');

        }else{
            return $this->errorResponse('','Your email or password is not valid') ;
        }

   }

   public function verficaremail($code){

        $user = User::where('code_verification',$code)->first();

        if($user != null){

            User::where('id',$user->id)->update([
                'email_verfication'=> 1,
                'status' => 1
            ]);


            $response = [
                'token' => $user->createToken('tahuCoding')->plainTextToken,
                'name' => $user->name,
                'email' => $user->email,
                'rol' => $user->getRoleNames()
            ];

            return $this->successResponse($response, 'User Succesfully Verfication email');

        }else{

            return $this->errorResponse('','Your token is invalid') ;
        }


    }

    public function logout(){

     $user = Auth::user();
     $user->tokens()->delete();
     return $this->successResponse('','Login Success');

    }
}
