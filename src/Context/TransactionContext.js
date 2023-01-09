import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractAbi, contractAddress } from '../utils/constants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


export const TransactionContext = React.createContext()


const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signers = provider.getSigner()

    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signers)

    return transactionContract
}

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("")
    const [formdata, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' })
    const [isLoading, setisLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [transactions, setTransactions] = useState([]);
    const [transactionHash, setTransactionHash] = useState('')
    const [coins, setCoins] = useState()
    const [search, setSearch] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChanges = e => {
        e.preventDefault()
        console.log(e)
        setSearch(e.target.value);
    };

    const filteredCoins = coins?.filter(coin =>
        coin?.name?.toLowerCase()?.includes(search.toLowerCase())
    );

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }


    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = getEthereumContract();

                const availableTransactions = await transactionsContract.getAllTransactions();

                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));

                console.log(structuredTransactions);

                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfwalletIsConnected = async () => {
        if (!ethereum) return alert("Please Install Metamask")
        const accounts = await ethereum.request({ method: 'eth_accounts' })

        if (accounts.length) {
            setCurrentAccount(accounts[0]);
            getAllTransactions()
        } else {
            console.log('No accounts found')
        }

        console.log(accounts)
    }
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };
    const disconnect = () => {
        ethereum.on('disconnect')
    }



    const checkIfTransactionsExists = async () => {
        try {
            if (ethereum) {
                const transactionsContract = getEthereumContract();
                const currentTransactionCount = await transactionsContract.getTransactionCount();

                window.localStorage.setItem("transactionCount", currentTransactionCount);
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };


    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('Please install Metamask')
            const transactionContract = getEthereumContract()
            const { addressTo, amount, keyword, message } = formdata
            const parsedAmount = ethers.utils.parseEther(amount)
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208",
                        value: parsedAmount._hex
                    }
                ]
            })
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)
            setisLoading(true)
            console.log(`Loading -${transactionHash.hash}`)
            setTransactionHash(transactionHash.hash)
            await transactionHash.wait()
            setisLoading(false)
            console.log(`Success -${transactionHash.hash}`)
            const transactionCount = await transactionContract.getTransactionCount()


            setTransactionCount(transactionCount.toNumber())
            toast.success('Transaction Successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setOpen()


        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }
    useEffect(() => {
        checkIfwalletIsConnected();
        checkIfTransactionsExists()
        // console.log(ethereum.isConnected())

    }, [transactionCount])

    useEffect(() => {
        axios
            .get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false'
            )
            .then(res => {
                setCoins(res.data);
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }, []);
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, disconnect, formdata, handleChange, setFormData, sendTransaction, isLoading, transactions, open, setOpen, handleOpen, handleClose, coins, filteredCoins, handleChanges, search, setSearch, transactionHash }}>
            {children}
        </TransactionContext.Provider>
    )
}