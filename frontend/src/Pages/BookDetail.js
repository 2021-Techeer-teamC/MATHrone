import * as React from "react";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { Grid, Paper, Card, CardMedia, CardContent, Button, Typography,
ListItemButton, ListItemText, List, Collapse} from '@mui/material';



export default function BookDetail() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
      };

    return (
        <div style={{ backgroundColor: "#E2E2E2", width: "100%" }}>
            <Card sx={{ display: 'flex' }} style={{ backgroundColor: "#E2E2E2", width: "100%", padding: "5%" }}>
                <CardMedia
                    style={{ marginRight: "5px" }}
                    component="img"
                    sx={{ width: 300 }}
                    image="https://storage.googleapis.com/mathrone-bucket/thumbnail/sample_workbook_thumnail.png"
                    alt="workbook thumbnail"
                />
                <CardContent style={{ textAlign: "left" }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        수학 - 고등학교 3학년
                    </Typography>
                    <Typography variant="h5" component="div">
                        2022학년도 수능 연계교재 수능완성
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        EBS
                    </Typography>
                    <Typography variant="body1">
                        -유형·테마편+실전편 구성의 수능 대비 최종 연계교재!
                        <br /><br />
                        ▶핵심 개념 정리와 출제 유형 완벽 공략
                        <br />
                        -주제별로 핵심 개념을 쉽게 정리하고, 유형별 해결 전략,자료분석,심화 학습이 가능한 유형별/테마별 특강을 배치
                        <br />
                        -수능 출제 경향 분석에 근거하여 개발한 다양한 유형의 문제를 통한 응용력과 탐구력 배양
                        <br /><br />
                        ▶실전 모의고사를 통한 연계교재 학습의 완성
                        <br />
                        -학습 내용을 최종 점검하여 본인의 실력을 테스트하고,수능에 대한 실전 감각을 기를 수 있는 실전 모의고사 수록
                    </Typography>
                    <Typography variant="body2">
                        # 수학1 #수학2 #미적분
                        <br />
                        <span style={{ color: "gray" }}>난이도 : 보통(1283)</span>
                    </Typography>
                    <hr></hr>
                    <Grid container>
                        <Grid item xs={2}>
                            <Button variant="contained" color="success" size="small">쉬움</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="success" size="small">중간</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="success" size="small">어려움</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div style={{backgroundColor:'white'}}>
            <Paper style={{width:"80%", margin:'auto'}} elevation={24}>
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary="수학1" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 6 }}>
                            <ListItemText primary="지수함수와 로그함수" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 6 }}>
                            <ListItemText primary="삼각함수" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 6 }}>
                            <ListItemText primary="수열" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={handleClick}>
                    <ListItemText primary="수학2" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 6 }}>
                            <ListItemText primary="함수의 극한과 연속" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 6 }}>
                            <ListItemText primary="다항함수의 미분법" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 6 }}>
                            <ListItemText primary="다항함수의 적분법" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={handleClick}>
                    <ListItemText primary="미적분" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 6 }}>
                            <ListItemText primary="수열의 극한" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 6 }}>
                            <ListItemText primary="미분법" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </Paper>
            </div>
        </div>
    );
}

