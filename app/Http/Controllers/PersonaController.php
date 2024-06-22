<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Excel as ExcelExcel;
use App\Exports\PersonasExport;

class PersonaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render (
            'Personas/Index',
            [
                'personas' => Persona::when($request->term, function ($query, $term) {
                    $query->where('cedula', 'LIKE', '%' . $term . '%')
                        ->OrWhere('nombre_apellido', 'LIKE', '%' . $term . '%')
                        ->OrWhere('telefono', 'LIKE', '%' . $term . '%');
                })->paginate(10)
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render (
            'Personas/Create',
            [

            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $personas = Persona::where('cedula','=',$request->cedula)->get();

        if (count($personas) === 1) {
            return redirect()->route('personas.create')->with('warning', 'Cédula duplicada!');
        }

        $validateData = $request->validate ([
            'cedula' => 'required',
            'nombre_apellido' => 'required',
            'telefono' => 'required'
        ]);

        Persona::create([
            'cedula' => $request->cedula,
            'nombre_apellido' => $request->nombre_apellido,
            'telefono' => $request->telefono
        ]);
        sleep(1);

        return redirect()->route('personas.index')->with('message', 'Persona creada con exito!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Persona $persona)
    {
        return Inertia::render (
            'Personas/Show',
            [
                'personas' => $persona
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Persona $persona)
    {
        return Inertia::render (
            'Personas/Edit',
            [
                'personas' => $persona
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $datosPersona = request() -> all();
        Persona::where('id','=',$id)->update($datosPersona);
        
        return redirect()->route('personas.index')->with('message', 'Persona editada con exito!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Persona::destroy($id);
        sleep(1);

        return redirect()->route('personas.index')->with('message', 'Persona borrada con exito!');
    }

    public function exportData()
    {
        date_default_timezone_set('America/Caracas');

        $hoy = date("Y-m-d-H:i:s");

        return Excel::download(new PersonasExport, 'reporte-'. $hoy .'.xlsx');
    }
}
