import * as React from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { debug } from "console";
import { Container } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
// import Medal from '../Components/Medal';

interface rankData {
    user_name: string;
    correct_count: number;
    try_count: number;
}

type dataList = {
    posts: rankData[];
}

let count: number

interface data {
    rank: number;
}

const Medal = (rank:data) => { // 순위에 따라서 메달 이미지 변경
    if (rank.rank-1 == 1)
        return (
            <CardMedia
                component="img"
                sx={{ width: 30 }}
                image="https://drive.google.com/uc?id=1O1dGZVqT1lcq7IHNGLjdeT_XMLSxT7sY"
                alt="gold medal" />);

    else if (rank.rank-1 < 5) {
        return (
            <CardMedia
                component="img"
                sx={{ width: 30 }}
                image="https://drive.google.com/uc?id=1gGOEcrCZS5iue5G1u3L3Gn2KgD8tOWFm"
                alt="silver medal" />);
    }
    else if (rank.rank-1 < 11) {
        return (
            <CardMedia
                component="img"
                sx={{ width: 30 }}
                image="https://drive.google.com/uc?id=1zvwV6Pkzj1UXHY2IlKAjPYH5SpE_sxsC"
                alt="bronze medal" />);
    }
    else {
        return (
            <Typography />
        );
    }
}


const RankList = ({ posts }: dataList) => {
    count = 1
    return (
        <Container>
            {posts.map((data: rankData) =>
            (
                <Card key={data.user_name} elevation={1} sx={{ display: 'grid', gridTemplateColumns: '0.5fr 0.5fr 3fr 1fr 1fr', mb: 1, p: 2 }}>
                    <Typography variant="body1" component="p">
                        {count++}
                    </Typography>
                    <Medal rank={count}/>
                    {/* <Typography/> */}
                    <Typography variant="body1" component="p" >
                        {data.user_name}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {data.try_count}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {data.correct_count}
                    </Typography>
                </Card>
            )
            )}
        </Container>
    )
};

export default RankList;