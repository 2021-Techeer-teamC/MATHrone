import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Rating from "@mui/material/Rating";
import styled from "styled-components";
import { useEffect } from "react";
import Pencil from "../Assets/image/pencil.png";

const BookSlider = ({ posts }) => {
  //시도 중인 문제집
  const [firstIdx, setFirstIdx] = React.useState(0);
  const [lastIdx, setLastIdx] = React.useState(
    parseInt((window.innerWidth - 200) / 280)
  ); //defalut로 보여질 갯수 + 1개
  const [data, setData] = React.useState(...[posts.slice(firstIdx, lastIdx)]);

  const [btnR, setBtnR] = React.useState(false);
  const [btnL, setBtnL] = React.useState(true);

  const moveBackward = () => {
    let f_idx = firstIdx;
    let l_idx = lastIdx;

    if (l_idx + 1 <= posts.length) {
      //범위를 넘어가지 않을 때만
      f_idx += 1;
      l_idx += 1;
      setBtnL(false);
    } else {
      setBtnR(true);
    }

    setFirstIdx(f_idx);
    setLastIdx(l_idx);

    const tmp = posts.slice(firstIdx, lastIdx);
    setData(tmp);
  };

  const moveForward = () => {
    let f_idx = firstIdx;
    let l_idx = lastIdx;

    if (f_idx - 1 >= 0) {
      f_idx -= 1;
      l_idx -= 1;
      setBtnR(false);
    } else {
      setBtnL(true);
    }

    setFirstIdx(f_idx);
    setLastIdx(l_idx);

    const tmp = posts.slice(firstIdx, lastIdx);
    setData(tmp);
  };

  useEffect(() => {
    const resize = () => {
      let value = parseInt(firstIdx + (window.innerWidth - 200) / 280);

      if (value <= 4 && value >= 1) {
        //최대 범위
        setLastIdx(value);
        const tmp = posts.slice(firstIdx, lastIdx);
        setData(tmp);
      }
    };

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  });

  return (
    <>
      {posts.length != 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "20px",
            paddingBottom: "60px",
            borderBottom: "1px solid #E4E4E4",
          }}
        >
          <div>
            <IconButton
              aria-label="arrow"
              size="large"
              onClick={moveForward}
              disabled={btnL}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          </div>
          <div>
            {data.map((item) => (
              <div
                style={{
                  float: "left",
                  marginRight: "30px",
                  marginLeft: "30px",
                }}
              >
                <Rating
                  name="size-large"
                  defaultValue={item.star === true ? 1 : 0}
                  max={1}
                  size="large"
                  color="red"
                  style={{
                    position: "absolute",
                    transform: "translate(530%,800%)",
                    zIndex: 3,
                  }}
                />
                <StyledDiv />
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
            <IconButton
              aria-label="arrow"
              size="large"
              onClick={moveBackward}
              disabled={btnR}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "50px",
            paddingBottom: "50px",
          }}
        >
          <img src={Pencil} width="100px" />
          <label
            style={{
              textAlign: "center",
              alignItems: "center",
              color: "#434343",
              paddingTop: "40px",
            }}
          >
            등록된 문제집이 없습니다.
          </label>
        </div>
      )}
    </>
  );
};

const StyledText = styled.text`
  //위치 이미지와 동일
  position: absolute;
  transform: translate(-100%, 50%);
  z-index: 3;

  padding: 10px;
  width: 200px;
  font-size: 20px;
  text-align: left;

  visibility: hidden;
  color: white;
`;

const StyledDiv = styled.div`
  position: absolute;
  transform: translate(0%, 0%);

  border-radius: 20px;
  width: 200px;
  height: 300px;

  z-index: 2;

  //hover 순서도 영향 미침 Styled 먼저하면 엄청 깜박거림
  &:hover {
    background-color: rgb(0, 0, 0, 0.5);
  }

  &:hover ~ ${StyledText} {
    visibility: visible;
  }
`;

const StyledImg = styled.img`
  border-radius: 20px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
`;

export default BookSlider;
