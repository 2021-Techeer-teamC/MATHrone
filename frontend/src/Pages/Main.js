import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import BookIcon from "@mui/icons-material/MenuBookRounded";
import StarIcon from "@mui/icons-material/Star";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import InfoPage from "./InfoPage";
import Books from "./Books";
import Rank from "./Rank";
import IconButton from "@mui/material/IconButton";
import BookSlider from "../Components/BookSlider";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import {
  FormControlLabel,
  FormGroup,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import List from "@mui/material/List";
import ProbList from "../Components/ProbList";
import MainCarousel from "../Components/MainCarousel";

const sections = [
  { title: "소개", url: "/info" },
  { title: "교재", url: "/books" },
  { title: "랭킹", url: "/rank" },
  { title: "소개", url: "/info" },
  { title: "교재", url: "/books" },
  { title: "랭킹", url: "/rank" },
];

const theme = createTheme();

export default function Main() {
  //화면 크기
  const size = {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight,
  };

  //시도 중인 문제집

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="MATHrone" sections={sections} />
          <main class="main2">
            <Routes>
              <Route path="/info" exact element={<InfoPage />} />
              <Route path="/books" exact element={<Books />} />
              <Route path="/rank" exact element={<Rank />} />
            </Routes>
            <div
              class="carousel"
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MainCarousel posts={addData} />
            </div>
            <div class="slider" style={{ paddingTop: "30px" }}>
              <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="left"
                noWrap
                sx={{ flex: 1 }}
                fontFamily="NotoSans-Bold"
                padding="5px"
              >
                {"  시도 중인 문제집"}
              </Typography>
              <BookSlider posts={itemData} />
            </div>
            <div class="slider2" style={{ paddingTop: "30px" }}>
              <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="left"
                noWrap
                sx={{ flex: 1 }}
                fontFamily="NotoSans-Bold"
                padding="5px"
              >
                {"  즐겨 찾기"}
              </Typography>

              <BookSlider posts={itemData} />
            </div>
            <div class="probA">
              <ProbList data={tryData} title={"오늘 가장 많이 시도한 문제"} />
            </div>
            <div class="probB">
              <ProbList data={tryData} title={"추천 문제"} />
            </div>
          </main>
        </Container>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </ThemeProvider>
    </Router>
  );
}

const addData = [
  {
    year: 2022,
    img: "https://storage.googleapis.com/mathrone-bucket/addthumb/2022.png",
    title: "수능완성",
    content: "2022학년도 수능 대비 수능완성과 함께",
  },
  {
    year: 2021,
    img: "https://storage.googleapis.com/mathrone-bucket/addthumb/2021.png",
    title: "수능완성",
    content: "2021학년도 수능 대비 수능완성과 함께",
  },
  {
    year: 2020,
    img: "https://storage.googleapis.com/mathrone-bucket/addthumb/2020.png",
    title: "수능완성",
    content: "2020학년도 수능 대비 수능완성과 함께",
  },
];

const itemData = [
  {
    workbook_id: "01-01-00001",
    title: "2020학년도 10월 고3 전국연합학력평가 문제지 수학 영역 (가형)",
    img:
      "https://storage.googleapis.com/mathrone-bucket/thumbnail/workbook-thumbnail-03.jpg",
    publisher: "교육청",
    level: 1,
    like: 2,
  },
  {
    workbook_id: "01-01-00002",
    title: "2021학년도 수능 연계교재 수능완성 수학영역 수학 가형",
    img:
      "https://storage.googleapis.com/mathrone-bucket/thumbnail/workbook-thumbnail-03.jpg",
    publisher: "EBS",
    level: 3,
    like: 3,
  },
  {
    workbook_id: "01-01-00003",
    title: "2020학년도 10월 고3 전국연합학력평가 문제지 수학 영역 (가형)",
    img:
      "https://storage.googleapis.com/mathrone-bucket/thumbnail/workbook-thumbnail-03.jpg",
    publisher: "교육청",
    level: 1,
    like: 2,
  },
  {
    workbook_id: "01-01-00004",
    title: "2021학년도 수능 연계교재 수능완성 수학영역 수학 가형",
    img:
      "https://storage.googleapis.com/mathrone-bucket/thumbnail/workbook-thumbnail-01.jpeg",
    publisher: "EBS",
    level: 2,
    like: 1,
  },
  {
    workbook_id: "01-01-00005",
    title: "2021학년도 수능 연계교재 수능완성 수학영역 수학 가형",
    img:
      "https://storage.googleapis.com/mathrone-bucket/thumbnail/workbook-thumbnail-01.jpeg",
    publisher: "EBS",
    level: 2,
    like: 6,
  },
  {
    workbook_id: "01-01-00006",
    title: "Honey",
    img:
      "https://storage.googleapis.com/mathrone-bucket/thumbnail/workbook-thumbnail-06.jpg",
    publisher: "평가원",
    level: 2,
    like: 10,
  },
  {
    workbook_id: "01-01-00007",
    title: "2021학년도 대학수학능력시험 문제지 수학 영역 (나형)",
    img:
      "https://storage.googleapis.com/mathrone-bucket/thumbnail/workbook-thumbnail-06.jpg",
    publisher: "평가원",
    level: 2,
    like: 7,
  },
  {
    workbook_id: "01-01-00008",
    title: "2021학년도 수능 연계교재 수능완성 수학영역 수학 가형",
    img:
      "https://storage.googleapis.com/mathrone-bucket/thumbnail/workbook-thumbnail-01.jpeg",
    publisher: "EBS",
    level: 3,
    like: 12,
  },
  {
    workbook_id: "01-01-00009",
    title: "2021학년도 수능 연계교재 수능완성 수학영역 수학 가형",
    img:
      "https://storage.googleapis.com/mathrone-bucket/thumbnail/workbook-thumbnail-01.jpeg",
    publisher: "EBS",
    level: 2,
    like: 6,
  },
  {
    workbook_id: "01-01-00010",
    title: "2021학년도 대학수학능력시험 문제지 수학 영역 (나형)",
    img:
      "https://storage.googleapis.com/mathrone-bucket/thumbnail/workbook-thumbnail-06.jpg",
    publisher: "평가원",
    level: 3,
    like: 12,
  },
  {
    workbook_id: "01-01-00011",
    title: "2021학년도 수능 연계교재 수능완성 수학영역 수학 가형",
    img:
      "https://storage.googleapis.com/mathrone-bucket/thumbnail/workbook-thumbnail-01.jpeg",
    publisher: "EBS",
    level: 3,
    like: 4,
  },
  {
    workbook_id: "01-01-00012",
    title: "2021학년도 대학수학능력시험 문제지 수학 영역 (나형)",
    img:
      "https://storage.googleapis.com/mathrone-bucket/thumbnail/workbook-thumbnail-06.jpg",
    publisher: "평가원",
    level: 3,
    like: 1,
  },
];

const tryData = [
  {
    problem_id: "01-01-00001",
    problem_num: "2",
    workbook_title: "수능완성",
    level: 1,
    subject: "미적분",
    chapter: "수열의 극한",
  },
  {
    problem_id: "01-01-00002",
    problem_num: "4",
    workbook_title: "수능완성",
    level: 3,
    subject: "미적분",
    chapter: "수열의 극한",
  },
  {
    problem_id: "01-01-00003",
    problem_num: "5",
    workbook_title: "수능완성",
    level: 2,
    subject: "미적분",
    chapter: "수열의 극한",
  },
  {
    problem_id: "01-01-00004",
    problem_num: "12",
    workbook_title: "모의고사",
    level: 2,
    subject: "미적분",
    chapter: "수열의 극한",
  },
  {
    problem_id: "01-01-00005",
    problem_num: "34",
    workbook_title: "모의고사",
    level: 3,
    subject: "미적분",
    chapter: "수열의 극한",
  },
  {
    problem_id: "01-01-00006",
    problem_num: "22",
    workbook_title: "수능완성",
    level: 2,
    subject: "미적분",
    chapter: "수열의 극한",
  },
  {
    problem_id: "01-01-00007",
    problem_num: "1",
    workbook_title: "수능완성",
    level: 1,
    subject: "미적분",
    chapter: "수열의 극한",
  },
  {
    problem_id: "01-01-00008",
    problem_num: "29",
    workbook_title: "수능완성",
    level: 1,
    subject: "미적분",
    chapter: "수열의 극한",
  },
  {
    problem_id: "01-01-00009",
    problem_num: "13",
    workbook_title: "수능완성",
    level: 3,
    subject: "수학I",
    chapter: "삼각함수",
  },
  {
    problem_id: "01-01-00010",
    problem_num: "18",
    workbook_title: "수능완성",
    level: 2,
    subject: "미적분",
    chapter: "적분법",
  },
  {
    problem_id: "01-01-00011",
    problem_num: "20",
    workbook_title: "수능완성",
    level: 3,
    subject: "미적분",
    chapter: "미분",
  },
];

const recData = [
  {
    problem_id: "01-01-00001",
    title: "Breakfast",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    publisher: "교육청",
    level: 1,
    like: 2,
  },
];
