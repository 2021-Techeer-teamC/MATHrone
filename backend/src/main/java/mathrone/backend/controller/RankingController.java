package mathrone.backend.controller;

import mathrone.backend.service.RankService;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
public class RankingController {
    private final RankService rankService;

    public RankingController(RankService rankService) {
        this.rankService = rankService;
    }

    @GetMapping("/rankdata") // 상위 랭킹 정보를 가져옴
    public Set<ZSetOperations.TypedTuple<String>> getRank(){
        return rankService.getAllRank();
    }

//    @GetMapping("/myrankdata") // 나의 랭킹 정보를 가져오기
//    public Set<ZSetOperations.TypedTuple<String>> getMyRank(/*user id*/){
//        return rankService.getMyRank(/*user id*/);
//    }

    @PostMapping("/setdata") // 맞춘 문제에 개수 업데이트하기
    public void setRank(/*nickname*/){
        rankService.setRank(/*nickname*/);
    }
}
