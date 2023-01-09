import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TransactionContext } from '../Context/TransactionContext';
import '../styles/index.css'


export default function CoinTable() {
    const { coins,filteredCoins } = React.useContext(TransactionContext)

    function createData(image, name, symbol, current_price, market_cap,price_change_percentage_24h) {
        return { image, name, symbol, current_price, market_cap,price_change_percentage_24h };
    }

    const rows = filteredCoins?.map((coin) => (
        createData(coin?.image, coin?.name, coin?.symbol, coin?.current_price, coin?.market_cap,coin?.price_change_percentage_24h)
    ))
    return (

        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {coins && (
                    <>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: "white" }}>#</TableCell>
                                <TableCell align="center" style={{ color: "white" }}>Name</TableCell>
                                <TableCell align="center" style={{ color: "white" }}>Price</TableCell>
                                <TableCell align="center" style={{ color: "white" }}>24hr</TableCell>
                                <TableCell align="center" style={{ color: "white" }}>Market Cap</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.image}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <img src={row.image} className="w-10 h-10 object-cover" />
                                    </TableCell>
                                    <TableCell align="center" style={{ color: "white",fontSize:"700" }}>
                                        {`${row.name}`}
                                    </TableCell>
                                    <TableCell align="center" style={{ color: "white" }}>{row.current_price.toLocaleString()}</TableCell>
                                    <TableCell align="center"  className={row.price_change_percentage_24h>0?`green`:`red`}>
                                        <h2 className={row.price_change_percentage_24h>0?`green`:`red`}>  {`${row.price_change_percentage_24h}`}</h2>
                                      
                                    </TableCell>
                                    
                                    <TableCell align="center" style={{ color: "white" }}>{row.market_cap.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </>
                )}

            </Table>
        </TableContainer>
    );
}