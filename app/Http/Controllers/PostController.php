<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{

    public function index()
    {

        $post = Post::all();

        return $this->successResponse(PostResource::collection($post), "Post Successfully" ) ;
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input,[
            'title' => 'required',
            'content' => 'required'

        ]);

        if($validator->fails()){


            return $this->errorResponse('Validacion errors', $validator->errors() ) ;

        }

        $post = Post::create($input);

        return $this->successResponse(new PostResource($post), "Post Successfully Created" ) ;


    }

    public function show($id)
    {
        $post = Post::find($id);

        if(is_null($post)){

            return $this->errorResponse('Post Not Found') ;
        }

        return $this->successResponse(new PostResource($post), "Post Successfully Retrieved" ) ;
    }

    public function update(Request $request, Post $post)
    {
        $input = $request->all();

        $validator = Validator::make($input,[
            'title' => 'required',
            'content' => 'required'

        ]);

        if($validator->fails()){

            return $this->errorResponse('Validacion errors', $validator->errors() ) ;

        }

        $post->title = $input['title'];
        $post->content = $input['content'];
        $post->save();

        return $this->successResponse(new PostResource($post), "Post Successfully Updated" ) ;
    }

    public function destroy(Post $post)
    {
       $post->delete();

       return $this->successResponse([], "Post Successfully Deleted" ) ;
    }
}
