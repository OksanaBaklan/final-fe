import React, { Fragment } from 'react';
import './Costs.css';
import CostItem from './CostItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import "./Costs.css";


const Costs = () => {

    const INITIAL_DATA = [
        {
            id: '',
            type: '+',
            date: new Date(2022, 4, 12),
            categories: 'Vehicle',
            labels: 'salmon',
            amount: 0.99,
            balance: ''
        },
        {
            id: '',
            type: '-',
            date: new Date(2022, 4, 12),
            categories: 'Food&Drinks',
            labels: 'pink',
            amount: 999.99
        },
        {
            id: '',
            date: new Date(2022, 4, 12),
            categories: 'Health Care',
            labels: 'mediumslateblue',
            amount: 9.99
        },
        {
            id: '',
            date: new Date(2022, 4, 12),
            categories: 'Basic Expanses',
            labels: 'skyblue',
            amount: 99.99
        },
        {
            id: '',
            date: new Date(2022, 4, 12),
            categories: 'Child Support',
            labels: 'slateblue',
            amount: 0.99
        },
        {
            id: '',
            date: new Date(2022, 4, 12),
            categories: 'Home, garden',
            labels: 'plum',
            amount: 0.99
        },
        {
            id: '',
            date: new Date(2022, 4, 12),
            categories: 'Education',
            labels: 'mediumaqamarine',
            amount: 9.99
        },
        {
            id: '',
            date: new Date(2022, 4, 12),
            categories: 'Holidays',
            labels: 'yellow',
            amount: 999.99
        },
        {
            id: '',
            date: new Date(2022, 4, 12),
            categories: 'Others Expanses',
            labels: 'mediumseagreen',
            amount: 99.99
        },
    ]

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const tableStyle = {
        marginTop: "60px",
        width: "45%",
        fontSize: "16px",
        left: "841px",
        fontFamily: 'Circe',
        position: "absolute",
    }

    const rowStyle = {
        fontWeight: "700",
        fontSize: "18px",
        fontFamily: 'Circe, sans-serif',
    }


    return (
        <TableContainer style={tableStyle}>
            <Table sx={{ minWidth: 650}}  aria-label="simple table">
          
                <TableHead sx={{"& .MuiTableCell-root:last-child": {
                  borderTopRightRadius: "30px",
                  borderBottomRightRadius: "30px",
                },backgroundColor: "white", 
                "& .MuiTableCell-root:first-child": {
                  borderTopLeftRadius: "30px",
                  borderBottomLeftRadius: "30px",
                },}} >
                    <TableRow >
                        <TableCell style={rowStyle}>Data</TableCell>
                        <TableCell style={rowStyle} align="right">Type</TableCell>
                        <TableCell style={rowStyle} align="right">Categories</TableCell>
                        <TableCell style={rowStyle} align="right">Comment</TableCell>
                        <TableCell style={rowStyle} align="right">Amount</TableCell>
                        <TableCell style={rowStyle} align="right">Balance</TableCell>
                    </TableRow>
                    </TableHead>

                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default Costs;