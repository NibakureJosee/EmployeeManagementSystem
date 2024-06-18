import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild
} from '@headlessui/react'
import { ArrowRightStartOnRectangleIcon, BookOpenIcon } from '@heroicons/react/20/solid'
import {
    Bars3Icon,
    HomeIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import { Avatar, Button } from '@mantine/core'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: HomeIcon },
    { name: 'Books', href: '/dashboard/books', icon: BookOpenIcon },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { user, logout, loggingOut } = useAuth();

    return (
        <>
            {user &&
                <div>
                    <Transition show={sidebarOpen}>
                        <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                            <TransitionChild
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-gray-900/80" />
                            </TransitionChild>

                            <div className="fixed inset-0 flex">
                                <TransitionChild
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="-translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-0"
                                    leaveTo="-translate-x-full"
                                >
                                    <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                                        <TransitionChild
                                            enter="ease-in-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-300"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                                <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                    <span className="sr-only">Close sidebar</span>
                                                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </TransitionChild>
                                        {/* Sidebar component, swap this element with another sidebar if you like */}
                                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                                            <nav className="flex flex-1 flex-col">
                                                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                    <li>
                                                        <ul role="list" className="-mx-2 space-y-1">
                                                            {navigation.map((item) => (
                                                                <li key={item.name}>
                                                                    <Link
                                                                        to={item.href}
                                                                        className={classNames(
                                                                            location.pathname === item.href
                                                                                ? 'bg-gray-800 text-white'
                                                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                                                        )}
                                                                    >
                                                                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                                        {item.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </Dialog>
                    </Transition>

                    {/* Static sidebar for desktop */}
                    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="flex flex-1 flex-col gap-y-7 pt-4">
                                    <li>
                                        <ul role="list" className="-mx-2 space-y-1">
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <Link
                                                        to={item.href}
                                                        className={classNames(
                                                            location.pathname === item.href
                                                                ? 'bg-gray-800 text-white'
                                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                                        )}
                                                    >
                                                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="mt-auto">
                                        <Button
                                            onClick={logout}
                                            loading={loggingOut}
                                            variant='outline' color='red'>
                                            <span>Logout</span>
                                            <ArrowRightStartOnRectangleIcon className='w-4 ml-2' />
                                        </Button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="lg:pl-72">
                        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                                <span className="sr-only">Open sidebar</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Separator */}
                            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                            <div className="flex justify-end flex-1 gap-x-4 self-stretch lg:gap-x-6">
                                <div className="flex items-center gap-x-4 lg:gap-x-6">


                                    {/* Profile dropdown */}
                                    <div className="relative">
                                        <div className="-m-1.5 flex items-center p-1.5">
                                            <span className="sr-only">Open user menu</span>
                                            <Avatar />
                                            <span className="hidden lg:flex lg:flex-col">
                                                <span className="ml-4 text-sm font-semibold text-gray-900" aria-hidden="true">
                                                    {user?.firstName} {user?.lastName}
                                                </span>
                                                <span className="ml-4 text-sm font-semibold text-gray-500" aria-hidden="true">
                                                    {user?.email}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <main className="py-6">
                            <div className="px-4 sm:px-6 lg:px-8">
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </div>
            }
        </>
    )
}
