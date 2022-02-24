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


import { useSelector } from 'react-redux';
import {useLocation} from "react-router-dom";
//
// interface bookItem {
//   workbookId: string;
//   title: string;
//   img: string;
//   publisher: string;
//   level: number;
//   like: number;
// }




export default function BookPage() {

  // const location = useLocation();
  // console.log(location.state);
  //
  // console.log("item data is ");
  // console.log(ress);
  // console.log(sample);




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
    const sortType = event.target.value; //정렬기준을 변경하면, 정렬기준 변수를 수정함 -> 수정되면 useEffect [sorted]가 수행됨
    setSorted(sortType);
    // console.log(sorted);
  };


  const selectPublisher = (publisher:string) => () => {
    setPublisher(publisher);
    setCategory("all");
  };

  // const clickBook = (value:string) => () => {
  //   setSelected(value);
  //   setURL("http://localhost:8080/workbook/publisher");
  //
  //   filterResult(value); //분류에 따라 보여지는 결과 변경
  // };


  const selectPage = (event : React.ChangeEvent<unknown>, page:number) => {
    setCurrentPage(page);
  };

  const selectCategory = (publisher:string, category:string) => () => {
    setCategory(category);
    setPublisher(publisher);
  };



  //get result
  /*
  1. 파라미터 3가지에 따른 문제집 9개 (한페이지당 보여줄 문제집 수 고정) -> bookItem[]
  2. 해당 section(publisher)별로 총 결과의 수 -> number
  3. 책 리스트 <- 이건 처음에 같이 받아온 후로 갱신 안됨
   */

  const [resultCnt,setResultCnt] = React.useState<number>(10);
  // const [itemDatas, setItemDatas] = React.useState<bookItem[]>([]); //axios결과 임시용
  const [result, setResult] = React.useState<bookItem[]>(itemData);
  const [bookContents,setBookContents] = React.useState<bookContent[]>(bookInfo);//empty bookList

  // const filterResult = (value:string) => {
    // axios (출판사로 보내기)
    // service.getWorkbookByPb(selected).then(res=>{
    //   setItemDatas(res.data);
    //   setResult(itemDatas);
    //   setCurrentPage(1);



      // eslint-disable-next-line no-restricted-globals
      // location.href = `http://localhost:8080/workbook?publisher=${selected}`;
    // })
    // axios.get(url, { params }).then(res:bookItem[] => {
    //   setItemDatas([...res])
    //   setResult(itemDatas);
    //   setCurrentPage(1);
    // });

    // 분류에 따라 결과 필터(not axios) 전체 결과 받아와서 react에서 출판사를 구분
    // let newRes = [...itemDatas];
    // if (value !== "all") {
    //   newRes = itemDatas.filter(function (element) {
    //     return element.publisher === value;
    //   });
    // }
    // setResult(newRes);
    // setCurrentPage(1); //결과 필터가 변경되면 page = 1 부터 시작



  // };






  // const getAllWorkbooks = async () => {
  //   console.log("start2");
  //   try {
  //     const res = await service.getAllWorkbook();
  //     setItemDatas(res.data);
  //     setResult(itemDatas);
  //   } catch (err){
  //     console.log(err);
  //   }
  //  console.log("end2");
  //
  // };
  //
  // useEffect(()=>{
  //   console.log("start");
  //   getAllWorkbooks();
  //   console.log("end");
  // },[])


  //기타 변수
  const [postsPerPage, setPostsPerPage] = React.useState<number>(3 * 3); //한페이지에 보여질 책의 수



  //sorted 변수 변경 시 마다 실ㅇ
  // useEffect(() => {
  //
  //   if (sorted === "star") {
  //     console.log("인기순 정렬");
  //     Array.from(itemDatas).sort(function (a, b) {
  //       return b.like - a.like; //인기 많은것부터
  //     });
  //   } else if (sorted === "level") {
  //     console.log("난이도순 정렬");
  //     Array.from(itemDatas).sort(function (a, b) {
  //       return b.level - a.level; //난이도 높은 것 부터
  //     });
  //   }
  //
  //   filterResult(selected); //itemData가 변경되었으므로, result를 다시 필터해야함
  // },[sorted] ); //sorted 변수가 변경될 떄 마다 실행


  useEffect(()=>{

  console.log("===========");
  console.log(sorted);
  console.log(publisher);
  console.log(category);
  console.log(currentPage);


  },[sorted,publisher,currentPage,category])


  //pagination과 관련된 변수
  // const [currentPage, setCurrentPage] = React.useState<number>(1);
  // const [postsPerPage, setPostsPerPage] = React.useState<number>(3 * 3); //한페이지에 보여질 책의 수

  // const indexOfLast = currentPage * postsPerPage;
  // const indexOfFirst = indexOfLast - postsPerPage;
  // function currentPosts(tmp:bookItem[]) {
  //   let currentPosts : bookItem[] = [];
  //   currentPosts = Array.from(tmp).slice(indexOfFirst, indexOfLast);
  //   return currentPosts;
  // }

  // const changePage = (event : React.ChangeEvent<unknown>, page:number) => {
  //   setCurrentPage(page);
  // };

  return (
    <div>
      <SearchBar></SearchBar>
      <Container>
        <div className="container">
          <div className="item" />
          <div className="item">
            <span style={{ minWidth: 120, float: "left" }}>
              {publisher == "all" ? "전체" : publisher}({resultCnt})
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
              count={Math.ceil(resultCnt / postsPerPage)}
              defaultPage={1}
              page={currentPage} //current page와 버튼상 보여지는 page를 동기화
              onChange={selectPage}
            />
          </div>
        </div>
      </Container>
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
