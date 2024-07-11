import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx'
import { Pagination } from '@/Components/Pagination.jsx'
import { Head } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import { useRef, useState } from 'react'

export default function Index ({ auth, personas }) {

    const [ term, setTerm ] = useState('')
    const [ isOpened, setIsOpened ] = useState(false)
    const { flash } = usePage().props

    function destroy(id) {
        if (confirm("Estás seguro que deseas eliminar esta persona?")) {
            router.delete(`/personas/${id}`)
        }
    }

    const getTerm = (e) => {
        const newTerm = e.target.value
        setTerm(newTerm)
    }

    function search(e) {
        e.preventDefault()
        router.get(route('personas.index', {term: term}))
    }

    const table = useRef()

    const printTable = () => {
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = table.current.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
        location.reload()
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Personas</h2>}
        >
            <Head title="Personas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {
                        flash.message
                        ? (
                            <div className="flex gap-2 items-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert" >
                                <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <span className="font-medium">{ flash.message }</span>
                            </div>
                        ) : (
                            ''
                        )
                    }
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className='flex gap-2'>
                                <Link className='inline-block' href={route('personas.create')}>
                                    <button className='flex justify-center items-center gap-2 my-2 px-4 py-2 transform hover:scale-105 duration-200 bg-slate-700 text-white rounded-lg'>
                                        <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
                                        </svg>
                                        Añadir persona
                                    </button>
                                </Link>
                                <a href={route('personas.export')}>
                                    <button className='flex justify-center items-center gap-2 my-2 px-4 py-2 transform hover:scale-105 duration-200 bg-green-700 text-white rounded-lg'>
                                        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
                                        </svg>
                                        Descargar Excel
                                    </button>
                                </a>
                                <button onClick={printTable} className='flex justify-center items-center gap-2 my-2 px-4 py-2 transform hover:scale-105 duration-200 bg-orange-700 text-white rounded-lg'>
                                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
                                    </svg>
                                    Descargar PDF
                                </button>
                            </div>
                            <div className="flex justify-end items-center mb-2">
                                <div className="text-center md:px-2 px-4">
                                    <div className="mb-3 xl:w-96">
                                        <form onSubmit={ e => search(e) } className="mb-4 flex w-full flex-wrap items-stretch">
                                            <input
                                                type="search"
                                                onChange={ e => getTerm(e) }
                                                className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-green-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                                                placeholder="Search"
                                                aria-label="Search"
                                                aria-describedby="button-addon1" />
                                            <button
                                                className="relative z-[2] flex items-center rounded-r bg-green-700 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                                                type="submit"
                                                onClick={ search }
                                                id="button-addon1"
                                                data-te-ripple-init
                                                data-te-ripple-color="light">
                                                <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="h-5 w-5">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                                    clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="relative overflow-x-auto shadow-md sm:rounded-lg"
                                ref={table}
                            >
                                <table
                                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                                >
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                                    >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">#</th>
                                            <th scope="col" className="px-6 py-3">
                                                Cédula
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Nombre y Apellido
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Teléfono
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Mostrar
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Editar
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Eliminar
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { personas.data.map(persona => {
                                            return (
                                                <tr key={persona.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                        { persona.id }
                                                    </td>
                                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                        { persona.cedula }
                                                    </td>
                                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                        { persona.nombre_apellido }
                                                    </td>
                                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                        { persona.telefono }
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Link href={route('personas.show', persona.id)}>
                                                            <button className="transform hover:scale-105 duration-200 px-4 py-2 text-white bg-gray-600 rounded-lg" >
                                                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                                                <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                                <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                                                <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                                                </g>
                                                            </svg>
                                                            </button>
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Link href={route('personas.edit', persona.id)}>
                                                            <button className="transform hover:scale-105 duration-200 px-4 py-2 text-white bg-blue-600 rounded-lg" >
                                                                <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.109 17H1v-2a4 4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536 6.364-6.364a2 2 0 0 1 2.829 0Z"/>
                                                                </svg>
                                                            </button>
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={ () => destroy(persona.id) } className="transform hover:scale-105 duration-200 text-white rounded-lg px-4 py-2 bg-red-700">
                                                            <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }) }
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={personas.links}></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
