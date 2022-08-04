package mathrone.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import mathrone.backend.domain.UserInfo;
import mathrone.backend.domain.UserProfile;
import mathrone.backend.domain.UserRank;
import mathrone.backend.repository.*;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final UserInfoRepository userInfoRepository;
    private final ZSetOperations<String, String> zSetOperations;

    public ProfileService(UserInfoRepository userInfoRepository, RedisTemplate<String, String> redisTemplate) {
        this.userInfoRepository=userInfoRepository;
        this.zSetOperations = redisTemplate.opsForZSet();
    }

    //userId를 받아와서 전송
    public UserProfile getProfile(Integer userId){

        //유저 정보 받아오기
        UserInfo userinfo = userInfoRepository.findByUserId(userId);
        //랭크 정보 받아오기
        ObjectNode node = getMyRank(userId);

        //랭크 정보를 DTO에 담기
        UserRank r = new UserRank(node.findValue("rank").toString(), node.findValue("score").toString(), node.findValue("try").toString());

        //최종 Profile 생성
        UserProfile res = new UserProfile(userinfo.getUserId(), userinfo.getId(), userinfo.getPassword(), userinfo.getProfileImg(),userinfo.getExp(),
                userinfo.isPremium(),userinfo.getEmail(), userinfo.getPhoneNum(), userinfo.getUserImg(),userinfo.getRole(),r);
        
        return res;
    }


    public ObjectNode getMyRank(Integer user_id){ // 리더보드에 필요한 나의 rank 조회
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();
        node.put("rank", zSetOperations.reverseRank("test", user_id.toString()) + 1);
        node.put("score", zSetOperations.score("test", user_id.toString()));
        node.put("try", userInfoRepository.getTryByUserID(user_id));
        return node;
    }


    public UserInfo getUserInfo(long userId){
        return userInfoRepository.getById(userId);
    }




}
