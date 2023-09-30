// Layout components
import { Footer } from '../both/Footer'
// React
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const OpenLayout = ({children}: Props)=> {

    return (<>

        {children}

        <Footer/>

    </>)
}
