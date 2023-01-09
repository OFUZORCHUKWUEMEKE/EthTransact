import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TransactionContext } from '../Context/TransactionContext';


export default function TransactionTable() {
    const { connectWallet, currentAccount, formdata, setFormDate, handleChange, transactions, open, handleClose, handleOpen, setOpen, transactionHash } = React.useContext(TransactionContext)


    function createData(from, to, amount, keyword, time) {
        return { from, to, amount, keyword, time };
    }
    console.log(transactions)

    const rows =
        transactions.map((transaction) => (
            createData(transaction.addressFrom, transaction.addressTo, transaction.amount, transaction.keyword, transaction.timestamp)
        ))
    console.log(rows)

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ color: 'white' }}>From</TableCell>
                        <TableCell style={{ color: 'white' }} align="center">To</TableCell>
                        <TableCell style={{ color: 'white' }} align="center">Amount</TableCell>
                        <TableCell style={{ color: 'white' }} align="center">keyword</TableCell>
                        <TableCell style={{ color: 'white' }} align="center">TimeStamp</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        // <a href={`https://goerli.etherscan.io/tx/${transactionHash}`}>
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ color: 'red' }}>
                                    {row.from.substring(0, 6)}...
                                </TableCell>
                                <TableCell align="center" style={{ color: '#22c55e' }}>{row.to.substring(0, 6)}...</TableCell>
                                <TableCell align="center" style={{ color: 'white' }}>{row.amount}</TableCell>
                                <TableCell align="center" style={{ color: 'white' }}>{row.keyword}</TableCell>
                                <TableCell align="center" style={{ color: 'white' }}>{row.time}</TableCell>
                            </TableRow>
                        // </a>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}