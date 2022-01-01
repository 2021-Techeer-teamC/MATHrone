import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
        {data.map((image) => (
          <div style={{ float: "left", margin: "10px" }}>
            <img src={image.img} width={"200px"} height={"300px"} alt="test" />
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

export default BookSlider;
