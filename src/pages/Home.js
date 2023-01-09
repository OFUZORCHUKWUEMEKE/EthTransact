import { Grid } from '@mui/material'
import React, { useContext } from 'react'
import EthModal from '../components/EthModal'
import { TransactionContext } from '../Context/TransactionContext'
import '../styles/index.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TransactionTable from '../components/TransactionTable'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Home = () => {
    const { connectWallet, currentAccount, formdata, setFormDate, handleChange, transactions, open, handleClose, handleOpen, setOpen } = useContext(TransactionContext)

    console.log(transactions)
    const { ethereum } = window;

    return (
        <>
            <div className='home min-h-screen overflow-hidden'>
                <div className='w-4/5 mx-auto'>
                    <div className='flex justify-between items-center py-6'>
                        <h2 className='text-xl home text-white cursor-pointer'>EthTransact</h2>
                        {!currentAccount && <div>
                            <button onClick={connectWallet} className='connect py-2 px-3'>Connect</button>
                        </div>}
                        {currentAccount && <div>
                            <button className='connect py-2 px-3'>Connected</button>
                        </div>}

                    </div>

                    <div className='min-h-[70vh] flex justify-center  md:w-[55%] w-[90%] mx-auto items-center'>
                        <div className='flex flex-col justify-center items-center'>
                            <h2 className='header text-[25px] md:text-[35px] text-center font-bold text-[#ff9fd5]'>SEND ETHEREUM  TOKENS ACCROSS THE WORLD WITH EASE</h2>
                            <div className='py-4'>
                                {!currentAccount && <button className='buttonn py-3 px-6 rounded-[50px]' onClick={connectWallet}>Get Started</button>}
                                {currentAccount && <button className='buttonn py-3 px-6 rounded-[50px]' onClick={() => handleOpen()}>Send Eth</button>}


                                <h4 className='text-gray-400 font-bold text-center py-4 cursor-pointer'>Learn More</h4>
                            </div>
                        </div>

                    </div>
                    <div className='py-6'>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <div className='py-3 card'>
                                    <div className='w-[90%] mx-auto py-2'>
                                        <h2 className='text-white font-bold text-xl'>Send ETH</h2>
                                        <div className='py-2'>
                                            <p className='text-white'>Send ethereum based tokens accross the Globe with few Clicks</p>
                                        </div>
                                        <div className='py-6 mt-2'>
                                            {ethereum && (
                                                <button className='connect py-2 px-3' onClick={currentAccount ? () => handleOpen() : connectWallet}>Send ETH</button>
                                            )}
                                              {!ethereum && (
                                                <button className='connect py-2 px-3' onClick={()=>alert('Please Install Metamask wallet')}>Send ETH</button>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className='py-3 card'>
                                    <div className='w-[90%] mx-auto py-2'>
                                        <h2 className='text-white font-bold text-xl'>24/7 Crypto Price Update</h2>
                                        <div className='py-2'>
                                            <p className='text-white'>Get Real Time Crypto Prices</p>
                                        </div>
                                        <div className='py-6 mt-2'>
                                            <Link to='/prices'>
                                                <button className='connect py-2 px-3'>Explore Now</button>
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className='py-5 cardTwo '>
                                    <div className='w-[90%] mx-auto py-2'>
                                        <h2 className='text-white font-bold text-xl'>Swap Tokens</h2>
                                        <div className='py-2'>
                                            <p className='text-white'>Buy and Sell Tokens on Ethereum and Polygon  accross the Globe </p>
                                        </div>
                                        <div className='py-1 mt-2'>
                                            <button className='connected py-2 px-3' disabled="true">Coming Soon</button>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className='py-5 cardTwo '>
                                    <div className='w-[90%] mx-auto py-2'>
                                        <h2 className='text-white font-bold text-xl'>Trade NFTs</h2>
                                        <div className='py-2'>
                                            <p className='text-white'>Get Up to date price information on up to 200 cryptocurrencies.</p>
                                        </div>
                                        <div className='py-1 mt-2'>
                                            <button className='connected py-2 px-3 text-red-500' disabled="true">Coming Soon</button>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                </div>
                {transactions.length > 0 && <div className='w-4/5 mx-auto'>
                    <div className='py-4'>
                        <h2 className='text-white text-center'>Recent Transactions</h2>
                    </div>
                    <TransactionTable />

                </div>}

                <div className='py-10'>
                    <div className='w-4/5 mx-auto'>
                        <p className='texted text-center text-sm'>2023 EthTransact</p>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <EthModal open={open} handleOpen={handleOpen} handleClose={handleClose} setOpen={setOpen} />
        </>
    )
}

export default Home;