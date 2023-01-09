import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TransactionContext } from '../Context/TransactionContext';
import '../styles/index.css'
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 320, md: 500 },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: { xs: 2, md: 2 }
};

const Input = ({ placeholder, name, type, value, handleChange }) => (

    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent border-gray-100 border text-sm"
    />
);

export default function EthModal({ open, setOpen, handleClose, handleOpen }) {

    const { connectWallet, currentAccount, formdata, setFormData, handleChange, sendTransaction, isLoading } = React.useContext(TransactionContext)


    const handleSubmit = (e) => {

        e.preventDefault();
        const { addressTo, amount, keyword, message } = formdata



        if (!addressTo || !amount || !keyword || !message) return;

        sendTransaction();

      
    };
    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <h1 className=" text-center text-3xl py-1">
                            Send Crypto <br /> across the world</h1>

                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Description" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="text-white w-full mt-2 p-2 send rounded-md cursor-pointer"
                        >
                            {isLoading ? <CircularProgress /> : 'Send'}
                        </button>

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}