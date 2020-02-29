<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Image;

class FileuploadController extends Controller
{

    public function upload(Request $request)
    {
        if($request->get('file'))
       {
          $image = $request->get('file');
          $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
          \Image::make($request->get('file'))->save(public_path('uploads/images/').$name);
          
        }

        $fileupload = new Image();
        $fileupload->title = $request->get("title");
        $fileupload->description = $request->get("description");
        $fileupload->file_name=$name;
        $fileupload->save();
        return response()->json(['success'=>'You have successfully upload file.']);

    }

    public function update(Request $request, $id)
    {
      
        $update = Image::findOrFail($id);
        $update->title = $request->get("title");
        $update->description = $request->get("description");
        $update->save();
        return response()->json(['success'=>'Successfully updated!']);

    }

}
