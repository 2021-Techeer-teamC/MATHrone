import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Paper from "@mui/material/Paper";

//타입 정의
interface bookItem {
  workbook_id: string;
  title: string;
  img: string;
  publisher: string;
  level: number;
  like: number;
}

//props로 전달받은 값들
type BookListProps = {
  posts : bookItem[];
}

// {}로 감싸주지 않으면 posts: bookItem[]을 인식하지 못함
const BookList = ( {posts} : BookListProps ) => {
  return (
    <ImageList sx={{ width: "100%", height: "100%" }} cols={3} gap={10}>
      {posts.map((item:bookItem) => (
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
  );
};

export default BookList;
