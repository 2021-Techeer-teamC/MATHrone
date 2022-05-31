import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Radio from '@mui/material/Radio';
import { Box, Button, TextField } from '@mui/material';
import { width } from '@mui/system';

interface problemData {
    problem_id: string;
    prob_num: number;
    chapter_id: string;
    prob_img: string;
    level_of_diff: number;
    category: boolean;
}

const probData: problemData[] = [
    {
        problem_id: "01-01-00001",
        prob_num: 1,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00001.png",
        level_of_diff: 2,
        category: true,
    },
    {
        problem_id: "01-01-00002",
        prob_num: 2,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00002.png",
        level_of_diff: 2,
        category: true,
    },
    {
        problem_id: "01-01-00003",
        prob_num: 3,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00003.png",
        level_of_diff: 2,
        category: true,
    },
    {
        problem_id: "01-01-00004",
        prob_num: 4,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00004.png",
        level_of_diff: 2,
        category: true,
    },
    {
        problem_id: "01-01-00005",
        prob_num: 5,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00005.png",
        level_of_diff: 2,
        category: true,
        
    },
    {
        problem_id: "01-01-00006",
        prob_num: 6,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00006.png",
        level_of_diff: 2,
        category: true,
    },
    {
        problem_id: "01-01-00007",
        prob_num: 7,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00007.png",
        level_of_diff: 2,
        category: false,
    },
    {
        problem_id: "01-01-00008",
        prob_num: 8,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00008.png",
        level_of_diff: 2,
        category: true,
    },
    {
        problem_id: "01-01-00009",
        prob_num: 9,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00009.png",
        level_of_diff: 2,
        category: true,
    },
    {
        problem_id: "01-01-00010",
        prob_num: 10,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00010.png",
        level_of_diff: 2,
        category: false,
    },
    {
        problem_id: "01-01-00011",
        prob_num: 11,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00001.png",
        level_of_diff: 2,
        category: true,
    },
    {
        problem_id: "01-01-00012",
        prob_num: 12,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00002.png",
        level_of_diff: 2,
        category: false,
    },
    {
        problem_id: "01-01-00013",
        prob_num: 13,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00003.png",
        level_of_diff: 2,
        category: true,
    },
    {
        problem_id: "01-01-00014",
        prob_num: 14,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00004.png",
        level_of_diff: 2,
        category: true,
    },
    {
        problem_id: "01-01-00015",
        prob_num: 15,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00005.png",
        level_of_diff: 2,
        category: true,
    },
    {
        problem_id: "01-01-00016",
        prob_num: 16,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00006.png",
        level_of_diff: 2,
        category: false,
    },
    {
        problem_id: "01-01-00017",
        prob_num: 17,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00007.png",
        level_of_diff: 2,
        category: true,
    },
    {
        problem_id: "01-01-00018",
        prob_num: 18,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00008.png",
        level_of_diff: 2,
        category: false,
    },
    {
        problem_id: "01-01-00019",
        prob_num: 19,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00009.png",
        level_of_diff: 2,
        category: true,
    },
    {
        problem_id: "01-01-00020",
        prob_num: 20,
        chapter_id: "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00010.png",
        level_of_diff: 2,
        category: true,
    },
];


const AnswerSheet = (props: any, popup: boolean) => {

    const { onClose } = props;
    const [inputs, setInputs] = React.useState([] =
        probData.map((probData: problemData) =>
        (
            {
                problem_id: probData.problem_id,
                my_answer: 'a'
            }
        ))
    );

    const onChange = (value: string, prob_num: string) => {
        setInputs(
            inputs.map((answer) =>
                answer.problem_id === prob_num ? { ...answer, my_answer: value } : answer
            )
        );
        // console.log(inputs);
    };

    const submitAnswer = (inputs: any) => {
        // answersheet 데이터 채점을 위해 전송
    }

    const styles = () => ({
        textField: {
            width: '90%',        
            paddingBottom: 0,
            paddingTop: 0,
            fontWeight: 500
        },
        input: {
            color: 'white'
        }
    });

    return (
        <Box ml={2} sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" padding='none'>No</TableCell>
                            <TableCell align="center" padding='none'>①</TableCell>
                            <TableCell align="center" padding='none'>②</TableCell>
                            <TableCell align="center" padding='none'>③</TableCell>
                            <TableCell align="center" padding='none'>④</TableCell>
                            <TableCell align="center" padding='none'>⑤</TableCell>
                        </TableRow>
                    </TableHead>
                    {probData.map((probData: problemData) =>
                    (
                        <TableBody key={probData.prob_num}>
                            {probData.category === false ? 
                            <TableRow>
                                <TableCell component="th" scope="row" align="center" padding='none'> {probData.prob_num} </TableCell>
                                <TableCell colSpan={5} align="center" padding="none">
                                        <TextField sx={{ pt: '0px' }} value={inputs[probData.prob_num - 1].my_answer} onChange={(e) => onChange(e.target.value, probData.problem_id)} 
                                            type="number" size="small" variant="standard" inputProps={{ style: {padding: 5} }} 
                                        />
                                </TableCell>
                            </TableRow>:
                            <TableRow>
                                <TableCell component="th" scope="row" align="center" padding='none'> {probData.prob_num} </TableCell>
                                <TableCell align="center" padding='none'>
                                    <Radio checked={parseInt(inputs[probData.prob_num - 1].my_answer) === 1} onChange={(e) => onChange(e.target.value, probData.problem_id)} value={1} name="radio-buttons" inputProps={{ 'aria-label': '1' }} />
                                </TableCell>
                                <TableCell align="center" padding='none'>
                                    <Radio checked={parseInt(inputs[probData.prob_num - 1].my_answer) === 2} onChange={(e) => onChange(e.target.value, probData.problem_id)} value={2} name="radio-buttons" inputProps={{ 'aria-label': '2' }} />
                                </TableCell>
                                <TableCell align="center" padding='none'>
                                    <Radio checked={parseInt(inputs[probData.prob_num - 1].my_answer) === 3} onChange={(e) => onChange(e.target.value, probData.problem_id)} value={3} name="radio-buttons" inputProps={{ 'aria-label': '3' }} />
                                </TableCell>
                                <TableCell align="center" padding='none'>
                                    <Radio checked={parseInt(inputs[probData.prob_num - 1].my_answer) === 4} onChange={(e) => onChange(e.target.value, probData.problem_id)} value={4} name="radio-buttons" inputProps={{ 'aria-label': '4' }} />
                                </TableCell>
                                <TableCell align="center" padding='none'>
                                    <Radio checked={parseInt(inputs[probData.prob_num - 1].my_answer) === 5} onChange={(e) => onChange(e.target.value, probData.problem_id)} value={5} name="radio-buttons" inputProps={{ 'aria-label': '5' }} />
                                </TableCell>
                            </TableRow>
                        }
                        </TableBody>
                    )
                    )}
                </Table>
            </TableContainer>
            <Button style={{ width: "100%", marginTop: "10px", borderRadius: 10, backgroundColor: "#dfdfdf", padding: "9px 18px", fontSize: "16px", color: "black" }}
                variant="contained"
                onClick={() => {
                    console.log(inputs);
                    // onClose(true);
                    // submitAnswer(inputs);
                }}>
                Submit
            </Button>
        </Box>
    );
}
export default AnswerSheet;
