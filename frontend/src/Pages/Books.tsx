import * as React from "react";
import axios, {AxiosResponse} from "axios";
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
import BookImgList from "../Components/BookImgList";
import { useEffect } from "react";

import service from "../Services/service";
import bookItem from "../Types/bookItem";
import bookContent from "../Types/bookContent";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import {ThemeProvider} from "@mui/material/styles";
import Footer from "../Components/Footer";
import {getTableSortLabelUtilityClass} from "@mui/material";





export default function BookPage(props: { sections: any }) {


  //책 토글 관련
  //책 리스트 토글마다 열림/닫힘 상태를 저장함
  const [open, setOpen] = React.useState<boolean[]>([false]); //각 토글들의 상태를 배열로 관리함

  const handleClick = (value : number) => () => {
    //value : 토글의 인덱스를 받아옴(몇번째 토글이 눌렸는지)
    const newOpen:boolean[] = [...open]; //상태를 저장한 open배열을 복사해옴
    const currentBool:boolean|undefined = open[value]; //현재 눌린 토글의 상태를 받아옴

    if (currentBool === undefined) {
      //존재하지 않음-> 누른적이 없음(닫힌상태)
      newOpen.push(true); //새로 true(열린상태)로 추가함
    } else {
      newOpen.splice(value, 1, !currentBool); //이미 배열에 존재하면, 상태를 반전시킴
    }

    setOpen(newOpen); //변경된 배열을 open배열에 복사해서 상태를 변경
  };

  //파라미터 (sortType/publisher/pageNum)
  //분류(book nav bar에서의 분류) 선택
  const [publisher, setPublisher] = React.useState<string>("all"); //출판사
  const [sorted, setSorted] = React.useState<string>("star");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [category, setCategory] = React.useState<string>("all");

  //setting parameter
  //정렬기준(난이도순, 인기순 등)
  //sortType 변경시 변수 수정
  const selectSort = (event : React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = event.target.value;
    setSorted(sortType);
    console.log(category);
    console.log(publisher);
    console.log(currentPage);
    console.log(sorted);
  };


  const selectPublisher = (publisher:string) => () => {
    setPublisher(publisher);
    setCategory("all");
    console.log(category);
    console.log(publisher);
    console.log(currentPage);
    console.log(sorted);
  };

  const selectPage = (event : React.ChangeEvent<unknown>, page:number) => {
    setCurrentPage(page);
    console.log(category);
    console.log(publisher);
    console.log(currentPage);
    console.log(sorted);
  };

  const selectCategory = (publisher:string, category:string) => () => {
    setCategory(category);
    setPublisher(publisher);
    console.log(category);
    console.log(publisher);
    console.log(currentPage);
    console.log(sorted);
  };



  //get result
  /*
  case 1. book page 최초 입장시
  ~/workbook
    1) bookItem[]
    publisher=all
    page = 1
    category = all
    sort = star(좋아요/인기순)
    디폴트로 하는 9개의 고정 결과
    2) 해당 디폴트 값에서 결과의 수
    3) bookList : bookContents[]
    왼쪽의 북 리스트


  case 2. 변경되는 파라미터 값에 따른 결과
  ~/workbook?publisher=${publisher}&sortType=${sortType}&category=${category}&pageNum=${pageNum}
      1) bookItem[]
      publisher=??
      page = ??
      category = ??
      sort = ??
      달라지는 파라미터에 대한 결과 9
    2) 해당 파라미터 값에서 결과의 수

   */

  const [resultCnt,setResultCnt] = React.useState<number>(0);
  // const [itemDatas, setItemDatas] = React.useState<bookItem[]>([]); //axios결과 임시용
  const [result, setResult] = React.useState<bookItem[]>(itemData);
  const [bookContents,setBookContents] = React.useState<bookContent[]>(bookInfo);//empty bookList


  //1. 9개의 결과를 가져오는 API (workbook?pub....)
  const getWorkbooks = async () => {
    console.log("GET 9 RESULT?????");
    try {
      const res = await service.getWorkbook(publisher,sorted,currentPage,category);
      //res 가 없어서 현재 error
      console.log(res.data);
      setResult(res.data);


    } catch (err){
      console.log(err);
    }
   console.log("end2");

  };

  //
  const getWorkList = async () => {
    console.log("GET LIST");
    try {
      const res = await service.getWorkbookList();
      // res가 없어서 에러 일단 주석
      console.log(res.data);
      // setResult(res.data);
      // setResultCnt(res.data.resultNumber);
      // setBookContents(res.data);

    } catch (err){
      console.log(err);
    }
    console.log("end2");

  };

  const getWorkbookInfo = async () => {
    console.log("get workbook info");
    try{
      const res = await service.getWorkbookInfo(publisher,category);
      console.log("갯수");
      console.log(res.data);
      setResultCnt(res.data);
    } catch (err){
      console.log(err);
    }
    console.log("end2");
  }


  //기타 변수
  const [postsPerPage, setPostsPerPage] = React.useState<number>(3 * 3); //한페이지에 보여질 책의 수
  const [wholePage, setWholePage] = React.useState<number>(Math.ceil(resultCnt/postsPerPage));


  useEffect(()=>{

    /*
     출판사/카테고리 (왼쪽 문제집리스트를 변경한 경우 페이지를 1로 디폴트로 설정 후 api얻음)
     */
    console.log("use effect changing pub/cat");
    setCurrentPage(1);
    getWorkbooks();
    getWorkbookInfo();
    console.log("use effect END changing pub/cat");


  },[publisher,category])


  useEffect(()=>{

    /*
    정렬 방법이나 페이지가 변경된 경우에 페이지를 1로 변경하지 않음
     */
    console.log("use effect changing page");
    getWorkbooks();

  },[sorted,currentPage])

  useEffect(()=>{

    console.log("내가 원하는거 ");
    console.log(resultCnt);
    console.log(postsPerPage);

    setWholePage(Math.ceil(resultCnt/postsPerPage));
    console.log("페이지 수 ");
    console.log(wholePage);

  },[resultCnt])


  return (
    <div>
      <Header title="MATHrone" sections={props.sections} />
      <NavBar sections={props.sections} />
      <SearchBar></SearchBar>
      <Container>
        <div className="container">
          <div className="item" />
          <div className="item">
            <span style={{ minWidth: 120, float: "left" }}>
              {category == "all" ? publisher=="all"?"전체":publisher : category}({resultCnt})
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
          <div className="item">
            <List
              sx={{ width: "100%", maxWidth: 250, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton>
                <ListItemText primary="전체" onClick={selectPublisher("all")} />
              </ListItemButton>
              {bookContents.map((value) => (
                <div key={value.id}>
                  <ListItemButton onClick={handleClick(value.id)}>
                    <ListItemText
                      primary={value.publisher}
                      onClick={selectPublisher(value.publisher)}
                    />
                    {open[value.id] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open[value.id]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {value.categories.map((category) => (
                          <div key={category}>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary={category} onClick={selectCategory(bookContents[value.id].publisher,category)} />
                        </ListItemButton>
                          </div>
                      ))}
                    </List>
                  </Collapse>
                </div>
              ))}
            </List>
          </div>
          <div className="item">
            <Paper>
              <BookImgList posts={result}/>
            </Paper>
          </div>
          <div className="item"></div>
          <div
            className="item"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Pagination
              count={wholePage}
              defaultPage={1}
              page={currentPage} //current page와 버튼상 보여지는 page를 동기화
              onChange={selectPage}
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

const itemData:bookItem[] = [
  {
    workbookId: "01-01-00001",
    title: "Breakfast",
    profileImg: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    publisher: "교육청",
    level: 1,
    like: 2,
  },
  {
    workbookId: "01-01-00002",
    title: "Burger",
    profileImg: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    publisher: "EBS",
    level: 3,
    like: 3,
  },
  {
    workbookId: "01-01-00003",
    title: "Camera",
    profileImg: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    publisher: "교육청",
    level: 1,
    like: 2,
  },
  {
    workbookId: "01-01-00004",
    title: "Camera",
    profileImg: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    publisher: "EBS",
    level: 2,
    like: 1,
  },
  {
    workbookId: "01-01-00005",
    title: "Hats",
    profileImg: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    publisher: "EBS",
    level: 2,
    like: 6,
  },
  {
    workbookId: "01-01-00006",
    title: "Honey",
    profileImg: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    publisher: "평가원",
    level: 2,
    like: 10,
  },
  {
    workbookId: "01-01-00007",
    title: "Basketball",
    profileImg: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    publisher: "평가원",
    level: 2,
    like: 7,
  },
  {
    workbookId: "01-01-00008",
    title: "Fern",
    profileImg: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    publisher: "EBS",
    level: 3,
    like: 12,
  },
  {
    workbookId: "01-01-00009",
    title: "Mushrooms",
    profileImg: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    publisher: "EBS",
    level: 2,
    like: 6,
  },
];

const bookInfo:bookContent[] = [
  {
    publisher: "EBS",
    categories: ["수능완성", "수능특강"],
    id: 0,
  },
  {
    publisher: "교육청",
    categories: [
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
    categories: ["6월 모의고사", "9월 모의고사", "대학수학능력시험"],
    id: 2,
  },
];
