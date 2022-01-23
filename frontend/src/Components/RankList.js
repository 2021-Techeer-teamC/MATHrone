import * as React from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const RankList = ({ posts }) => {
    var count = 1;
    return (
        <div>
            {posts.map((result) => (
                <Card key={result.user_name} elevation={1} sx={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr 1fr', mb: 1, p: 2 }}>
                    <Typography variant="body1" component="p">
                        {count++}
                    </Typography>
                    <Typography variant="body1" component="p" >
                        {result.user_name}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {result.correct_count}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {result.try_count}
                    </Typography>
                </Card>
            ))}
        </div>
    )
};
  
  export default RankList;