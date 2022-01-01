import * as React from "react";
import "../Assets/styles/components.css"

import { createTheme, ThemeProvider } from "@mui/material/styles";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";


const theme = createTheme();

export default function Main() {
  //시도 중인 문제집
  const [data, setData] = React.useState(...[itemData.slice(0, 4)]);
  const [firstIdx, setFirstIdx] = React.useState(0);
  const [lastIdx, setLastIdx] = React.useState(4); //defalut로 보여질 갯수 + 1개

  const moveBackward = () => {
    let f_idx = firstIdx;
    let l_idx = lastIdx;

    if (l_idx + 1 < itemData.length) {
      //범위를 넘어가지 않을 때만
      f_idx += 1;
      l_idx += 1;
    }

    setFirstIdx(f_idx);
    setLastIdx(l_idx);

    const tmp = itemData.slice(firstIdx, lastIdx);
    setData(tmp);
  };

  const moveForward = () => {
    let f_idx = firstIdx;
    let l_idx = lastIdx;

    if (f_idx - 1 > 0) {
      f_idx -= 1;
      l_idx -= 1;
    }

    setFirstIdx(f_idx);
    setLastIdx(l_idx);

    const tmp = itemData.slice(firstIdx, lastIdx);
    setData(tmp);
  };

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="MATHrone" sections={sections} />
          <main class="main">
            <Routes>
              <Route path="/info" exact element={<InfoPage />} />
              <Route path="/books" exact element={<Books />} />
              <Route path="/rank" exact element={<Rank />} />
            </Routes>

            <Carousel
              autoPlay={true}
              interval={3000} // default = 3000
              infiniteLoop={true}
              swipeable={true} // default = true
              width={"500px"}
              showStatus={false}
              showThumbs={false}
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
            <div>
              <button onClick={moveForward}>
                <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
              </button>
              <div>
                {data.map((image) => (
                  <div>
                    <img src={image.img} width="120" height="120" alt="testA" />
                  </div>
                ))}
              </div>
              <button onClick={moveBackward}>
                <ArrowForwardIosIcon></ArrowForwardIosIcon>
              </button>
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
