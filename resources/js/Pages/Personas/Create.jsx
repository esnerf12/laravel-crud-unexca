import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx'
import { Head, usePage } from '@inertiajs/react'
import { router } from '@inertiajs/react'

export default function Create ({ auth }) {
    
    const { flash } = usePage().props

    function handleSubmit (e) {
        e.preventDefault()
        const data = {
            cedula: e.target.cedula.value,
            nombre_apellido: e.target.nombre_apellido.value,
            telefono: e.target.telefono.value
        }

        router.post('/personas', data)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear persona</h2>}
        >
            <Head title="Personas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {
                        flash.warning
                        ? (
                            <div className="flex gap-2 items-center p-4 mb-4 text-sm text-orange-500 bg-orange-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert" >
                                <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="font-medium">{ flash.warning }</span>
                            </div>
                        ) : (
                            ''
                        )
                    }
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
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder=""
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 "
                                >
                                    Crear
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
