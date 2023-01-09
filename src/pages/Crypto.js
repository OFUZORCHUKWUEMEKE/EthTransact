import { CircularProgress, IconButton } from '@mui/material'
import React, { useContext, useEffect, useRef } from 'react'
import CoinTable from '../components/CoinTable'
import { TransactionContext } from '../Context/TransactionContext'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../styles/index.css'
import { useNavigate } from 'react-router-dom';
const Crypto = () => {
    const { coins, filteredCoins, handleChanges } = useContext(TransactionContext)
    const navigate = useNavigate()
    const topRef = useRef()

    useEffect(()=>{
         topRef.current.scrollIntoView({behaviour:'smooth'})
    },[])
    return (
        <>
            <div className='home min-h-screen' ref={topRef}>
                <div className='py-10'>
                    <div className='w-[95%] mx-auto flex items-center space-x-3 cursor-pointer' onClick={()=>navigate('/')}>
                        <IconButton>
                             <ArrowBackIcon className='text-white'/>
                        </IconButton>
                        <h2 className='heading font-bold text-white'>Home</h2>
                    </div>
                    <div className='py-5'>
                        <div className='py-3'>
                            <h2 className='heading text-white px-4 text-center text-xl'>Cryptocurrency Prices by Market Cap</h2>
                        </div>
                        <div className='flex justify-center items-center'>
                            <form>
                                <input
                                    className='coin-input'
                                    type='text'
                                    onChange={handleChanges}
                                    placeholder='Search Crypto'
                                />
                            </form>
                        </div>
                    </div>

                    <div className=' w-[90%] mx-auto  flex justify-center items-center'>

                        {filteredCoins.length > 0 ? (
                            <CoinTable />
                        ) : <CircularProgress />
                        }

                    </div>
                </div>

            </div>
        </>
    )
}

export default Crypto