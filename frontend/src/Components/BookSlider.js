import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styled from "styled-components";

const BookSlider = ({ posts }) => {
  //시도 중인 문제집
  const [firstIdx, setFirstIdx] = React.useState(0);
  const [lastIdx, setLastIdx] = React.useState(4); //defalut로 보여질 갯수 + 1개
  const [data, setData] = React.useState(...[posts.slice(firstIdx, lastIdx)]);

  const moveBackward = () => {
    let f_idx = firstIdx;
    let l_idx = lastIdx;

    if (l_idx + 1 < posts.length) {
      //범위를 넘어가지 않을 때만
      f_idx += 1;
      l_idx += 1;
    }

    setFirstIdx(f_idx);
    setLastIdx(l_idx);

    const tmp = posts.slice(firstIdx, lastIdx);
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

    const tmp = posts.slice(firstIdx, lastIdx);
    setData(tmp);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "20px",
      }}
    >
      <div>
        <IconButton aria-label="arrow" size="large" onClick={moveForward}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </div>
      <div>
        {data.map((item) => (
          <div
            style={{
              float: "left",
              margin: "10px",
            }}
          >
            <StyledImg
              src={item.img}
              width={"200px"}
              height={"300px"}
              alt="test"
            />
            <StyledText>{item.title}</StyledText>
          </div>
        ))}
      </div>
      <div>
        <IconButton aria-label="arrow" size="large" onClick={moveBackward}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  );
};

const StyledText = styled.text`
  //이미지랑 같은 크기로 검은색
  background-color: rgb(0, 0, 0, 0.5);
  width: 200px;
  height: 300px;
  border-radius: 20px;

  //위치 이미지와 동일
  position: absolute;
  transform: translate(-100%, 0%);
  padding: 20px;
  padding-top: 70px;

  font-size: 25px;
  text-align: center;

  color: white;

  visibility: hidden;
`;

const StyledImg = styled.img`
  border-radius: 20px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */

  &:hover + ${StyledText} {
    visibility: visible;
  }

  &:hover {
    color: rgb(0, 0, 0, 0.5);
  }
`;

export default BookSlider;
