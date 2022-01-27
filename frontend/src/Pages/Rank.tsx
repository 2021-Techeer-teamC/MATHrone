import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useEffect } from "react";
import "../App.css";
import RankList from '../Components/RankList';


interface rankData {
  user_name: string;
  correct_count: number;
  try_count: number;
}

type dataList = {
  posts: rankData[];
}

export default function Rankpage() {

   
  const [rankDatas, setRankDatas] = React.useState([...rankData]);
  const [res, setRes] = React.useState([...rankDatas]);

  useEffect(() => {
    // axios (출판사로 보내기)
    // axios.get(url, { params }).then((rank) => {
    //  setItemDatas([...rank])
    //   setResult(rankDatas);
    // 랭크데이터 받아오기
    setRes(rankDatas);
  }, [])

  return (
    <Container>
      <Box sx={{ display: "flex", paddingBottom: 0.1 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center", pt: 5 }}>
            <CardMedia
              component="img"
              sx={{ width: 90, pr:2}}
              image="https://drive.google.com/uc?id=1obBgZRkXdAbR7PUgax1TL5XC1PQdsSkN"
              alt="Live from space album cover"
            />
            <Typography variant="h4">
              Ranking
            </Typography>
          </Box>
          <CardContent>
            <Typography variant="h6" component="div" align='left'>
              맞은 문제 별 전체 순위
            </Typography>
          </CardContent>
        </Box>
      </Box>
      
      <Card style={{backgroundColor: 'WhiteSmoke'}} sx={{p:1}}>
        <Card elevation={5} sx={{ display: 'flex', flexDirection: 'column', pb: 2, pt: 2, mb: 3, pr:5, pl:5 }}>
          <div className="rankContainer">
            <Typography variant="body1" component="p">
              랭킹
            </Typography>
            <Typography variant="body1" component="p">
              유저 닉네임
            </Typography>
            <Typography variant="body1" component="p">
              맞은 문제 수
            </Typography>
            <Typography variant="body1" component="p">
              시도한 문제 수
            </Typography>
          </div>
        </Card>

        <RankList posts={res}/>
      </Card>

      <Card variant="outlined" sx={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr 1fr', mt: 2, pt: 3, pb: 3, pl:5, pr:6}}>
          <Typography variant="body1" component="p">
            10000
          </Typography>
          <Typography variant="body1" component="p">
            its meeee
          </Typography>
          <Typography variant="body1" component="p">
            100
          </Typography>
          <Typography variant="body1" component="p">
            124
          </Typography>
      </Card>
    </Container>
  );
}

const rankData:rankData[] = [
  {
    user_name: "tester1",
    correct_count: 904,
    try_count: 1000,
  },
  {
    user_name: "tester2",
    correct_count: 860,
    try_count: 1200,
  },
  {
    user_name: "tester3",
    correct_count: 123,
    try_count: 506,
  },
  {
    user_name: "tester4",
    correct_count: 123,
    try_count: 506,
  },
  {
    user_name: "tester5",
    correct_count: 123,
    try_count: 506,
  },
  {
    user_name: "tester6",
    correct_count: 123,
    try_count: 506,
  },
  {
    user_name: "tester7",
    correct_count: 123,
    try_count: 506,
  },
  {
    user_name: "tester8",
    correct_count: 123,
    try_count: 506,
  },
  {
    user_name: "tester9",
    correct_count: 123,
    try_count: 506,
  },
  {
    user_name: "tester10",
    correct_count: 123,
    try_count: 506,
  },
];