<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ChangeAvatarRequest;
use App\Http\Controllers\Api\BaseController;

class UserApiController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        // dd($request);

        $users = User::first();

        if($request->has('keyword')){
            $users = $users->where('name', 'LIKE', "%{$request->keyword}%");
            $request->merge([
                'page' => 1
            ]);

        }

        if($request->has('column.sorter')){
            $orderBy = $request->order == 'ascend' ? 'asc' : 'desc';

            $users = $users->orderBy($request->field, $orderBy);
        }

        if($request->has('pagination.pageSize')){
            $users = $users->paginate($perPage = $request->pagination['pageSize']);
        }else{
            $users = $users->get();
        }


        $response = [
            'status' => "success",
            'message' => "Data successfully retrivied.",
            'data' => $users,
        ];

        return response()->json($response, 200);

    }
}
