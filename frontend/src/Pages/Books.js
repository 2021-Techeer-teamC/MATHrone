import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Pagination from "@mui/material/Pagination";

import SearchBar from "../Components/SearchBar";
import "../App.css";
import { ListItem } from "@mui/material";

export default function BookPage() {
  //책 리스트 토글
  const [open, setOpen] = React.useState([false]); //각 토글들의 상태를 배열로 관리함

  const handleClick = (value) => () => {
    //value : 토글의 인덱스를 받아옴(몇번째 토글이 눌렸는지)
    const newOpen = [...open]; //상태를 저장한 open배열을 복사해옴
    const currentBool = open[value]; //현재 눌린 토글의 상태를 받아옴

    if (currentBool === undefined) {
      //존재하지 않음-> 누른적이 없음(닫힌상태)
      newOpen.push(true); //새로 true(열린상태)로 추가함
    } else {
      newOpen.splice(value, 1, !currentBool); //이미 배열에 존재하면, 상태를 반전시킴
    }

    setOpen(newOpen); //변경된 배열을 open배열에 복사해서 상태를 변경
  };

  //분류 선택
  const [selected, setSelected] = React.useState("전체");
  const [result, setResult] = React.useState([...itemData]);

  const clickBook = (value) => () => {
    setSelected(value);

    filterResult(value); //분류에 따라 보여지는 결과 변경
  };

  const filterResult = (value) => {
    //분류에 따라 결과 필터
    let newRes = [...itemData];
    if (value !== "전체") {
      newRes = itemData.filter(function (element) {
        return element.publisher === value;
      });
    }
    setResult(newRes);
  };

  //정렬기준
  const selectSort = (event) => {
    const select = event.target.value;

    console.log(select);

    if (select === "star") {
      console.log("인기순 정렬");
      itemData.sort(function (a, b) {
        return b.like - a.like; //인기 많은것부터
      });
    } else if (select === "difficulty") {
      console.log("난이도순 정렬");
      itemData.sort(function (a, b) {
        return b.difficulty - a.difficulty; //난이도 높은 것 부터
      });
    }

    console.log(itemData);
    //즉각 반영이 안되는 문제..
  };

  return (
    <div>
      <SearchBar></SearchBar>
      <Container>
        <div class="container">
          <div class="item" />
          <div class="item">
            <span style={{ minWidth: 120, float: "left" }}>
              {selected}({result.length})
            </span>
            <FormControl sx={{ minWidth: 120, float: "right" }}>
              <NativeSelect
                defaultValue={"star"}
                inputProps={{
                  name: "category",
                  id: "uncontrolled-native",
                }}
                onChange={selectSort}
              >
                <option value={"star"}>인기순</option>
                <option value={"difficulty"}>난이도순</option>
              </NativeSelect>
            </FormControl>
          </div>
          <div class="item">
            <List
              sx={{ width: "100%", maxWidth: 250, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton>
                <ListItemText primary="전체" onClick={clickBook("전체")} />
              </ListItemButton>
              {bookData.map((value) => (
                <>
                  <ListItemButton onClick={handleClick(value.id)}>
                    <ListItemText
                      primary={value.publisher}
                      onClick={clickBook(value.publisher)}
                    />
                    {open[value.id] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open[value.id]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {value.books.map((b) => (
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary={b} onClick={clickBook(b)} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              ))}
            </List>
          </div>
          <div className="item">
            <Paper>
              <ImageList sx={{ width: "100%", height: 500 }} cols={3} gap={10}>
                {result.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={item.title}
                      subtitle={<span>{item.publisher}</span>}
                      position="below"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Paper>
          </div>
          <div class="item"></div>
          <div
            className="item"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Pagination count={10} />
          </div>
        </div>
      </Container>
    </div>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    publisher: "EBS",
    like: 1,
    difficulty: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    publisher: "EBS",
    like: 3,
    difficulty: 3,
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    publisher: "교육청",
    like: 1,
    difficulty: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    publisher: "EBS",
    like: 2,
    difficulty: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    publisher: "평가원",
    like: 6,
    difficulty: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    publisher: "EBS",
    like: 10,
    difficulty: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    publisher: "EBS",
    like: 7,
    difficulty: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    publisher: "평가원",
    like: 100,
    difficulty: 3,
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    publisher: "평가원",
    like: 6,
    difficulty: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    publisher: "교육청",
    like: 12,
    difficulty: 3,
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    publisher: "평가원",
    like: 4,
    difficulty: 3,
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    publisher: "교육청",
    like: 1,
    difficulty: 3,
  },
];

const bookData = [
  {
    publisher: "EBS",
    books: ["수능완성", "수능특강"],
    id: 0,
  },
  {
    publisher: "교육청",
    books: [
      "3월 모의고사",
      "4월 모의고사",
      "5월 모의고사",
      "7월 모의고사",
      "8월 모의고사",
      "10월 모의고사",
    ],
    id: 1,
  },
  {
    publisher: "평가원",
    books: ["6월 모의고사", "9월 모의고사", "대학수학능력시험"],
    id: 2,
  },
];
