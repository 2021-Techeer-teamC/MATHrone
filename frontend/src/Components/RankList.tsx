import * as React from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { debug } from "console";
import { Container } from '@mui/material';

interface rankData {
    user_name: string;
    correct_count: number;
    try_count: number;
}

type dataList = {
    posts: rankData[];
}

var count : number = 1

const RankList = ( {posts} : dataList ) => {
    count = 1
    return (
        <Container>
            {posts.map((data : rankData) => 
                (
                    <Card key={data.user_name} elevation={1} sx={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr 1fr', mb: 1, p: 2 }}>
                        <Typography variant="body1" component="p">
                            {count++}
                        </Typography>
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