package mathrone.backend.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import mathrone.backend.repository.WorkBookRepository;


import java.util.Set;


@Service
public class RankService {

    private final ZSetOperations<String, String> zSetOperations;
    private final WorkBookRepository workBookRepository;

    public RankService(RedisTemplate<String, String> redisTemplate, WorkBookRepository workBookRepository) {
        this.zSetOperations = redisTemplate.opsForZSet();
        this.workBookRepository = workBookRepository;
    }

    public JsonArray getAllRank(/*nickname*/){ // 리더보드에 필요한 rank 데이터 조회
        JsonArray jsonArray = new JsonArray();
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores("test", 0, -1);
        //LinkedHashMap으로 리턴함
        for(ZSetOperations.TypedTuple<String> str : rankSet) {
            JsonObject jsonObject = new JsonObject();
            int temp = Integer.parseInt(str.getValue());
            jsonObject.addProperty("score", str.getScore());
            jsonObject.addProperty("nickname", workBookRepository.getNickname(temp));
            jsonObject.addProperty("try", workBookRepository.getTryByUserID(temp));
            jsonArray.add(jsonObject);
        } // 해당 유저가 시도한 문제 수를 포함한 JSON 형식 다시 생성
        //System.out.println(jsonArray.getClass());
        return jsonArray;
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
