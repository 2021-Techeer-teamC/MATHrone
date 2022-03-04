package mathrone.backend.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.Set;


@Service
public class RankService {

    private final ZSetOperations<String, String> zSetOperations;

    public RankService(RedisTemplate<String, String> redisTemplate) {
        this.zSetOperations = redisTemplate.opsForZSet();
    }

    public Set<ZSetOperations.TypedTuple<String>> getAllRank(/*nickname*/){ // 리더보드에 필요한 rank 데이터 조회 현재는 전체로 되어있음
        java.util.Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores("test", 0, -1);
        //LinkedHashMap으로 리턴해줌
        return rankSet;
    }

//    public Set<ZSetOperations.TypedTuple<String>> getMyRank(/*nickname*/){ // 리더보드에 필요한 나의 rank 조회
//        //java.util.Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores("rankscore", 0, -1);
//        //return rankSet;
//    }

    public void setRank(/*nickname*/){ // 문제를 풀었을 시에 스코어를 올려주는 용도
        zSetOperations.incrementScore("rankscore", "nickname1", 1);
        // value값에 해당하는 score에 delta값을 더해줌, value 값이 없을시 자동 추가
    }
}
