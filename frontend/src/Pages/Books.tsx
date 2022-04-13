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
  };

  //좌측 리스트에서 출판사 변경시
  //publisher변경 시 수정
  const selectPublisher = (publisher:string) => () => {
    setPublisher(publisher);
    setCategory("all");//publisher가 변경되는 경우 category는 all
  };

  //page를 변경하는 경
  const selectPage = (event : React.ChangeEvent<unknown>, page:number) => {
    setCurrentPage(page);
  };

  //category를 선택한 경우-> pulisher도 변경될 수 있음 유의
  const selectCategory = (publisher:string, category:string) => () => {
    setCategory(category);
    setPublisher(publisher);
  };




  //3개의 API전송으로 받아지는 결과
  const [resultCnt,setResultCnt] = React.useState<number>(0);//결과의 수
  const [result, setResult] = React.useState<bookItem[]>([]);//실제 결과 (9개)
  const [bookContents,setBookContents] = React.useState<bookContent[]>([]);//좌측 북리스트


  //1. 9개의 결과를 가져오는 API (workbook?pub....)
  const getWorkbooks = async () => {
    try {
      const res = await service.getWorkbook(publisher,sorted,currentPage,category);//api에 필요한 파라미터들 4가지에 따라 달라 -> 이 파라미터가 변경될 떄마다 함수 실행 필요(useEffect)
      setResult(res.data);//결과를 받아서 결과 변수에 저장
    } catch (err){
      console.log(err);
    }
  };

  //2. 좌측 리스트를 받아오는 API(workbook/list)
  const getWorkList = async () => {
    try {
      const res = await service.getWorkbookList();
      setBookContents(res.data);
    } catch (err){
      console.log(err);
    }
  };

  //3. 결과의 수를 가져오는 API(workbook/info?pub..)
  const getWorkbookInfo = async () => {
    try{
      const res = await service.getWorkbookInfo(publisher,category);//2가지 파라미터에 따라 달라짐 -> 이 파라미터가 변경될 떄마다 함수 실행 필요(useEffect)
      setResultCnt(res.data);
    } catch (err){
      console.log(err);
    }
  }


  //페이지 관련 변수들
  const [postsPerPage, setPostsPerPage] = React.useState<number>(3 * 3); //한페이지에 보여질 책의 수 (변경 가능하나 default)
  const [wholePage, setWholePage] = React.useState<number>(Math.ceil(resultCnt/postsPerPage)); // 결과의 수 / 9 개 올림


  //출판사/ 카테고라가 변경되는 경우 -> 보여지는 결과가 달라짐 , 결과의 갯수가 달라짐
  useEffect(()=>{

    /*
     출판사/카테고리 (왼쪽 문제집리스트를 변경한 경우 페이지를 1로 디폴트로 설정 후 api얻음)
     */
    setCurrentPage(1);//default
    getWorkbooks();
    getWorkbookInfo();

  },[publisher,category])

  //정렬 방법/ 페이지 가 변경되는 경우 -> 보여지는 결과만 달라짐
  useEffect(()=>{

    /*
    정렬 방법이나 페이지가 변경된 경우에 페이지를 1로 변경하지 않음
     */
    getWorkbooks();

  },[sorted,currentPage])

  //결과가 변경되는 경우 총 페이지 수가 변경되어야 함
  useEffect(()=>{
    setWholePage(Math.ceil(resultCnt/postsPerPage));
  },[resultCnt])


  //페이지 최초 로딩시
  useEffect(()=>{
    /*
      1. (default:전체) all출판사 , all카테고리 , star좋아요순 , 1page 를 기본으로 9개의 결과
      2. 위의
    */
    getWorkbooks();
    getWorkbookInfo();
    getWorkList();

  },[])


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
              {/*category를 선택한 경우 category를 publisher를 선택한 경우 publisher를... + all은 전체로 보여져야함 */}
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
                {/*보여지는 것은 전체->변수는 all*/}
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
