import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Box } from "@mui/system";
import Card from '@mui/material/Card';
import {Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import Chart from "../Components/Chart";

interface answerData {
    problem_id: string;
    my_answer: number;
    answer: number;
}

interface score {
    title : string;
    value : number;
    color : string;
}

let count: number;
let correct: number;
let wrong: number;

const answerData: answerData[] = [
    {
        problem_id: "01-01-00001",
        my_answer: 1,
        answer: 1,
    },
    {
        problem_id: "01-01-00002",
        my_answer: 2,
        answer: 1,
    },
    {
        problem_id: "01-01-00003",
        my_answer: 3,
        answer: 3,
    },
]

export default function Result(props: { sections: any; }) {
    count = 0;
    correct = 0;
    wrong = 0;

    answerData.map((answerData: answerData) => 
        {answerData.my_answer === answerData.answer ? correct++: wrong++})
    

    var score: score[] = [
        { title: 'correct', value: correct, color: '#73C23A' },
        { title: 'wrong', value: wrong, color: '#C13C37' },
    ]

    return (
        <div>
            <Header title="MATHrone" sections={props.sections} />
            <NavBar sections={props.sections} />
            <Box sx={{ display: 'block' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '3%' }}>
                    <Chart data={score}/>
                </Box>
                <Table style={{ width: '50%', margin: 'auto' }}>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#d2d2d2' }}>
                            <TableCell align="center" padding='none'> No. </TableCell>
                            <TableCell align="center" padding='none'> 정 답 </TableCell>
                            <TableCell align="center" padding='none'> 나의 답 </TableCell>
                            <TableCell align="center" padding='none'> 결 과 </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {answerData.map((answerData: answerData) =>
                        (
                            <TableRow key={answerData.problem_id}>
                                <TableCell align="center" padding='none'>
                                    {++count}
                                </TableCell>
                                <TableCell align="center" padding='none'>
                                    {answerData.answer}
                                </TableCell>
                                <TableCell align="center" padding='none'>
                                    {answerData.my_answer}
                                </TableCell>
                                <TableCell align="center" padding='none'>
                                    <Box>
                                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                                            {answerData.my_answer === answerData.answer ?
                                                <Card sx={{ backgroundColor: '#73C23A', p: 'none', width: '50%' }}><Typography>정답</Typography></Card> :
                                                <Card sx={{ backgroundColor: '#C13C37', p: 'none', width: '50%' }}><Typography>오답</Typography></Card>
                                            }
                                        </Box>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Footer title="Footer" description="Something here to give the footer a purpose!" />
        </div>
    );
}
