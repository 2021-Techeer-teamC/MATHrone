import * as React from "react";
import { Grid, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Level3 from "@mui/icons-material/Filter3";
import Level1 from "@mui/icons-material/Filter1";
import Level2 from "@mui/icons-material/Filter2";
import Link from "@mui/material/Link";

const ProbList = ({ data, title }) => {
  let icon = {
    1: <Level1 />,
    2: <Level2 />,
    3: <Level3 />,
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={60}>
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
          <List>
            {data.map((item) => (
              <ListItem>
                <ListItemIcon>{icon[item.level]}</ListItemIcon>
                <ListItemText
                  primary={item.workbook_title + " " + item.problem_num + "번"}
                  secondary={item.subject + " - " + item.chapter}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default ProbList;
