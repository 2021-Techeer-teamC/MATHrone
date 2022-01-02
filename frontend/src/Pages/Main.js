import * as React from "react";
import "../Assets/styles/components.css"

import { createTheme, ThemeProvider } from "@mui/material/styles";

import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
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
  ListItemText,
} from "@mui/material";
import List from "@mui/material/List";
import ProbList from "../Components/ProbList";

const theme = createTheme();

export default function Main() {
  //화면 크기
  const size = {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight,
  };

  //시도 중인 문제집

  return (
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
              <Carousel
                autoPlay={true}
                interval={3000} // default = 3000
                infiniteLoop={true}
                swipeable={true} // default = true
                width={"100%"}
                showStatus={false}
                showThumbs={false}
                dynamicHeight={false}
              >
                <div>
                  <img src="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1597645587822-e99fa5d45d25" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1567306301408-9b74779a11af" />
                </div>
              </Carousel>
            </div>
            <div class="slider" style={{ paddingTop: "30px" }}>
              <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="left"
                noWrap
                sx={{ flex: 1 }}
              >
                <MenuBookRoundedIcon fontSize={"large"} />
                시도 중인 문제집
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
              >
                <StarRoundedIcon fontSize={"large"} />
                즐겨찾기
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
  );
}

const itemData = [
  {
    workbook_id: "01-01-00001",
    title: "Breakfast",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    publisher: "교육청",
    level: 1,
    like: 2,
  },
  {
    workbook_id: "01-01-00002",
    title: "Burger",
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    publisher: "EBS",
    level: 3,
    like: 3,
  },
  {
    workbook_id: "01-01-00003",
    title: "Camera",
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    publisher: "교육청",
    level: 1,
    like: 2,
  },
  {
    workbook_id: "01-01-00004",
    title: "Camera",
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    publisher: "EBS",
    level: 2,
    like: 1,
  },
  {
    workbook_id: "01-01-00005",
    title: "Hats",
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    publisher: "EBS",
    level: 2,
    like: 6,
  },
  {
    workbook_id: "01-01-00006",
    title: "Honey",
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    publisher: "평가원",
    level: 2,
    like: 10,
  },
  {
    workbook_id: "01-01-00007",
    title: "Basketball",
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    publisher: "평가원",
    level: 2,
    like: 7,
  },
  {
    workbook_id: "01-01-00008",
    title: "Fern",
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    publisher: "EBS",
    level: 3,
    like: 12,
  },
  {
    workbook_id: "01-01-00009",
    title: "Mushrooms",
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    publisher: "EBS",
    level: 2,
    like: 6,
  },
  {
    workbook_id: "01-01-00010",
    title: "Tomato basil",
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    publisher: "평가원",
    level: 3,
    like: 12,
  },
  {
    workbook_id: "01-01-00011",
    title: "See star",
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    publisher: "EBS",
    level: 3,
    like: 4,
  },
  {
    workbook_id: "01-01-00012",
    title: "Bike",
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
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
    level: 3,
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
    level: 3,
    subject: "미적분",
    chapter: "수열의 극한",
  },
  {
    problem_id: "01-01-00004",
    problem_num: "12",
    workbook_title: "모의고사",
    level: 3,
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
    level: 3,
    subject: "미적분",
    chapter: "수열의 극한",
  },
  {
    problem_id: "01-01-00007",
    problem_num: "1",
    workbook_title: "수능완성",
    level: 3,
    subject: "미적분",
    chapter: "수열의 극한",
  },
  {
    problem_id: "01-01-00008",
    problem_num: "29",
    workbook_title: "수능완성",
    level: 3,
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
    level: 3,
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
