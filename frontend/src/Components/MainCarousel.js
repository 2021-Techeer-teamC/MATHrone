import * as React from "react";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const MainCarousel = ({ posts }) => {
  const preventDefault = (event) => event.preventDefault();

  return (
    <div style={{ paddingBottom: "60px", borderBottom: "1px solid #E4E4E4" }}>
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
        {posts.map((item) => (
          <div>
            <Link
              href="#"
              underline="hover"
              style={{
                position: "absolute",
                transform: "translate(40%, 1200%)",
              }}
            >
              {item.year + " " + item.title + " 바로 가기"}
            </Link>
            <YearLabel>{item.year}</YearLabel>
            <TitleLabel>{item.title}</TitleLabel>
            <ContentLabel>{item.content}</ContentLabel>
            <img src={item.img} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const YearLabel = styled.label`
  //위치 이미지와 동일
  position: absolute;
  transform: translate(100%, 230%);

  font-size: 30px;
  text-align: center;

  color: black;
  font-family: NotoSans-Regular;
`;
const TitleLabel = styled.label`
  //위치 이미지와 동일
  position: absolute;
  transform: translate(30%, 180%);

  font-size: 50px;
  text-align: center;

  color: black;
  font-family: NotoSans-Bold;
`;
const ContentLabel = styled.label`
  //위치 이미지와 동일
  position: absolute;
  transform: translate(20%, 800%);

  font-size: 20px;
  text-align: center;

  color: #434343;
  font-family: NotoSans-Thin;
`;

export default MainCarousel;
