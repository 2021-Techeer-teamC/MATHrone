import React, { useEffect } from "react";
import Pagination from "../Components/ProbPagination";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import ProbImg from "../Components/ProbImg";
import AnswerSheet from "../Components/AnswerSheet";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";


interface problemData {
    problem_id: string;
	prob_num: number;
	chapter_id: string;
	prob_img: string;
	level_of_diff : number;
}


export default function ProblemDetail (props: { sections: any; }) {
    const [data, setProbDatas] = React.useState([...probData]);
    const [num, setNum] = React.useState(1);

    useEffect(() => {
        setProbDatas(probData);
        //setProbDatas(api 요청)
    }, [])
  
    return (
        <Box>
            <Header title="MATHrone" sections={props.sections}/>
            <NavBar sections={props.sections}/>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <AnswerSheet/>
                </Grid>    
                <Grid item xs={8}>
                    <ProbImg posts={data[num-1]} setNum={setNum} num={num} len={data.length}/>
                    <Pagination setNum={setNum} len={data.length} num={num}/>
                </Grid>
                <Grid item xs={2}/>
            </Grid>
            <Footer title="Footer" description="Something here to give the footer a purpose!"/>
        </Box>
    );
  }

const probData: problemData[] = [
    {
        problem_id: "01-01-00001",
        prob_num: 1,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00001.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00002",
        prob_num: 2,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00002.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00003",
        prob_num: 3,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00003.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00004",
        prob_num: 4,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00004.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00005",
        prob_num: 5,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00005.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00006",
        prob_num: 6,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00006.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00007",
        prob_num: 7,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00007.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00008",
        prob_num: 8,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00008.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00009",
        prob_num: 9,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00009.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00010",
        prob_num: 10,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00010.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00001",
        prob_num: 11,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00001.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00002",
        prob_num: 12,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00002.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00003",
        prob_num: 13,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00003.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00004",
        prob_num: 14,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00004.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00005",
        prob_num: 15,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00005.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00006",
        prob_num: 16,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00006.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00007",
        prob_num: 17,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00007.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00008",
        prob_num: 18,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00008.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00009",
        prob_num: 19,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00009.png",
        level_of_diff: 2,
    },
    {
        problem_id: "01-01-00010",
        prob_num: 20,
        chapter_id : "01",
        prob_img: "https://storage.googleapis.com/mathrone-bucket/problem/suwan_na_2021/02-01-00010.png",
        level_of_diff: 2,
    },
  ];


  