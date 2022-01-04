import * as React from "react";
import { Grid, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Level3 from "@mui/icons-material/Filter3";
import Level1 from "@mui/icons-material/Filter1";
import Level2 from "@mui/icons-material/Filter2";
import Gold from "../Assets/image/gold-medal.png";
import Silver from "../Assets/image/silver-medal.png";
import Bronze from "../Assets/image/bronze-medal.png";
import Pencil from "../Assets/image/pencil.png";

import Link from "@mui/material/Link";

const ProbList = ({ data, title }) => {
  let icon = {
    1: Bronze,
    2: Silver,
    3: Gold,
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <div
            style={{
              display: "flex",
              textAlign: "left",
              alignItems: "center",
              paddingTop: "50px",
              paddingBottom: "15px",
            }}
          >
            <label
              style={{
                fontFamily: "NotoSans-Bold",
                fontSize: "25px",
                borderBottom: "2px solid #BCDCC4",
              }}
            >
              {title}
            </label>
            <Link
              href="#"
              underline="hover"
              style={{
                paddingLeft: "30px",
              }}
            >
              {"더보기"}
            </Link>
          </div>
          {data.length != 0 ? (
            <List>
              {data.slice(0, 10).map((item) => (
                <ListItem>
                  <ListItemText
                    primary={
                      item.workbook_title + " " + item.problem_num + "번"
                    }
                    secondary={item.subject + " - " + item.chapter}
                  />
                  <ListItemIcon>
                    <img src={icon[item.level]} width="30px" />
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "100px",
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
                충분한 데이터가 수집되지 않았습니다.
              </label>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ProbList;
