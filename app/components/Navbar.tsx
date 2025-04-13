"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import { EmailAddress } from '@clerk/nextjs/server'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { checkAndAddUser } from '../action'

const Navbar = () => {

    const { isLoaded, isSignedIn, user } = useUser()

    useEffect(() => {
        if(user?.primaryEmailAddress?.emailAddress){
            checkAndAddUser(user?.primaryEmailAddress?.emailAddress)
        }
    }, [user])

    return (
        <div className='bg-base-200/30 px-5 md:px-[10%] py-4'>
            {isLoaded && (
                (isSignedIn ? (
                    <>
                        <div className='flex justify-between items-center'>
                            <div className='flex text-2xl items-center font-bold'>
                                Gest <span className='text-warning'>Finance</span>
                            </div>
                            <div className='md:flex hidden'>
                                <Link href={""} className='btn rounded-full'>
                                    Mes Budgets
                                </Link>
                                <Link href={""} className='btn rounded-full mx-4'>
                                    Tableau de bord
                                </Link>
                                <Link href={""} className='btn rounded-full'>
                                    Mes Transactions
                                </Link>
                            </div>
                            <UserButton />
                        </div>

                        <div className='md:hidden flex mt-2 justify-center'>
                                <Link href={""} className='btn btn-sm rounded-full'>
                                    Mes Budgets
                                </Link>
                                <Link href={""} className='btn btn-sm rounded-full mx-4'>
                                    Tableau de bord
                                </Link>
                                <Link href={""} className='btn btn-sm rounded-full'>
                                    Mes Transactions
                                </Link>
                            </div>
                    </>
                ) : (
                    <div className='flex items-center justify-between'>
                        <div className='flex text-2xl items-center font-bold'>
                                Gest <span className='text-warning'>Finance</span>
                            </div>
                         <div className='flex mt-2 justify-center'>
                                <Link href={"/sign-in"} className='btn btn-sm rounded-full'>
                                    Se connecter
                                </Link>
                                <Link href={"/sign-up"} className='btn btn-sm rounded-full mx-4 btn-warning'>
                                    S'inscrire
                                </Link>
                            </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Navbar
