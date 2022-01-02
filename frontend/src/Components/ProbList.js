import * as React from "react";
import { Grid, ListItem, ListItemText } from "@mui/material";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";

const ProbList = ({ data, title }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{ mt: 4, mb: 2 }}
            variant="h6"
            component="div"
            align="left"
          >
            {title}
          </Typography>
          <List>
            {data.map((item) => (
              <ListItem>
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
