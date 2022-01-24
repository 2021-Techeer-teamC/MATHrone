import * as React from "react";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

// import axios from "axios";
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
import Pagination from "@mui/material/Pagination";

import SearchBar from "../Components/SearchBar";
import "../App.css";
import BookList from "../Components/BookList";
import { useEffect } from "react";

export default function BookPage(props) {
  //책 리스트 토글마다 열림/닫힘 상태를 저장함
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

  //분류(book nav bar에서의 분류) 선택
  const [selected, setSelected] = React.useState("all");
  const [itemDatas, setItemDatas] = React.useState([...itemData]); //axios결과 임시용
  const [result, setResult] = React.useState([...itemDatas]);
  const [url, setURL] = React.useState("");

  const params = new URLSearchParams([["publisher", selected]]);

  const clickBook = (value) => () => {
    setSelected(value);
    setURL("http://localhost:8080/workbook/publisher");

    filterResult(value); //분류에 따라 보여지는 결과 변경
  };

  const filterResult = (value) => {
    // axios (출판사로 보내기)
    // axios.get(url, { params }).then((res) => {
    //  setItemDatas([...res])
    //   setResult(itemDatas);
    //   setCurrentPage(1);
    // });

    //분류에 따라 결과 필터(not axios) 전체 결과 받아와서 react에서 출판사를 구분
    let newRes = [...itemDatas];
    if (value !== "all") {
      newRes = itemDatas.filter(function (element) {
        return element.publisher === value;
      });
    }
    setResult(newRes);
    setCurrentPage(1); //결과 필터가 변경되면 page = 1 부터 시작
  };

  //정렬기준(난이도순, 인기순 등)
  const [sorted, setSorted] = React.useState("star");
  const selectSort = (event) => {
    const select = event.target.value; //정렬기준을 변경하면, 정렬기준 변수를 수정함 -> 수정되면 useEffect [sorted]가 수행됨
    setSorted(select);
    // console.log(sorted);
  };

  useEffect(() => {
    //itemData의 정렬을 바꾸어서 정렬함
    console.log(result);

    if (sorted === "star") {
      console.log("인기순 정렬");
      itemDatas.sort(function (a, b) {
        return b.like - a.like; //인기 많은것부터
      });
    } else if (sorted === "level") {
      console.log("난이도순 정렬");
      itemDatas.sort(function (a, b) {
        return b.level - a.level; //난이도 높은 것 부터
      });
    }

    filterResult(selected); //itemData가 변경되었으므로, result를 다시 필터해야함
  }, [sorted]); //sorted 변수가 변경될 떄 마다 실행

  //pagination과 관련된 변수
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage, setPostsPerPage] = React.useState(3 * 3); //한페이지에 보여질 책의 수

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const changePage = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header title="MATHrone" />
      <NavBar sections={props.sections} />
      <SearchBar></SearchBar>
      <Container>
        <div class="container">
          <div class="item" />
          <div class="item">
            <span style={{ minWidth: 120, float: "left" }}>
              {selected == "all" ? "전체" : selected}({result.length})
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
                <option value={"level"}>난이도순</option>
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
                <ListItemText primary="전체" onClick={clickBook("all")} />
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
              <BookList posts={currentPosts(result)}></BookList>
            </Paper>
          </div>
          <div class="item"></div>
          <div
            className="item"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Pagination
              count={Math.ceil(result.length / postsPerPage)}
              defaultPage={1}
              page={currentPage} //current page와 버튼상 보여지는 page를 동기화
              onChange={changePage}
            />
          </div>
        </div>
      </Container>

      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </div>
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
