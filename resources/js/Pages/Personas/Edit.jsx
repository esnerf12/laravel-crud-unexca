import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx'
import { Head } from '@inertiajs/react'
import { useState } from 'react'
import { router } from '@inertiajs/react'

export default function Create ({ auth, personas }) {

    const [ values, setValues ] = useState({
        cedula: personas.cedula,
        nombre_apellido: personas.nombre_apellido,
        telefono: personas.telefono
    })

    function handleSubmit(e) {
        e.preventDefault()
        router.put(`/personas/${personas.id}`, values)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar persona</h2>}
        >
            <Head title="Personas" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={ handleSubmit }>
                                <div className="mb-6">
                                    <label
                                        htmlFor="cedula"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >Cédula
                                    </label>
                                    <input
                                        type="number"
                                        name="cedula"
                                        defaultValue={ values.cedula }
                                        onChange={ e => setValues({ cedula: e.target.value }) }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder=""
                                    />
                                </div>                                
                                <div className="mb-6">
                                    <label
                                        htmlFor="nombre_apellido"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >Nombre y Apellido
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre_apellido"
                                        defaultValue={ values.nombre_apellido }
                                        onChange={ e => setValues({ nombre_apellido: e.target.value }) }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder=""
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="telefono"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >Teléfono
                                    </label>
                                    <input
                                        type="text"
                                        name="telefono"
                                        defaultValue={ values.telefono }
                                        onChange={ e => setValues({ telefono: e.target.value }) }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder=""
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 "
                                >
                                    Editar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
