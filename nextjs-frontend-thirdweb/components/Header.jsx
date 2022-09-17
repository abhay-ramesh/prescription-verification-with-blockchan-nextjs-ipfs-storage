import { ConnectWallet } from '@thirdweb-dev/react'
import Image from 'next/image'
import React, { useState } from 'react'

function Header({ address }) {
    return (
        <>
            <div className="flex justify-between items-center py-4 bg-zinc-800 text-white border-b-2 border-gray-600 text-center px-6 w-screen">
                <div className="flex items-center mr-4">
                    <Image src="/logo.png" alt="logo" layout='fixed' width={32} height={32} className="h-8 w-8 mr-2" />
                    <h1 className="text-white text-2xl font-bold text-center">
                        <a href="/" className="text-white text-2xl font-bold text-center">
                            Blockchain Raju
                        </a>
                    </h1>
                </div>
                <ConnectWallet accentColor="#f213a4" colorMode="light" />
            </div>

        </>
    )
}

export default Header