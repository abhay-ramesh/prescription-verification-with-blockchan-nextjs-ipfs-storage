import React from 'react'
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import Header from '../Header';


function AuthWrap({ Component, pageProps }) {
    const address = useAddress()
    return (<>
        {address ?
            (
                <>
                    <Header address={address} />
                    <Component {...pageProps} address={address} />
                </>
            )
            :
            (
                <>
                    <Header address={address} />
                    <div className=' h-screen w-full flex flex-col justify-center items-center'>
                        <ConnectWallet accentColor="#f213a4" colorMode="light" />
                    </div>
                </>
            )
        }
    </>
    )
}

export default AuthWrap