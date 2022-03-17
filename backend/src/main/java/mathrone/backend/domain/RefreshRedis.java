package mathrone.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@RedisHash("RefreshToken")
@AllArgsConstructor
@Builder
@Getter
public class RefreshRedis {

    @Id
    private String userId;
    private String refreshToken;
    // redis에서 설정한 시간 이후에 자동으로 해당 데이터가 사라지는 휘발성 데이터를 만들어주는 annotation
    @TimeToLive
    private Long expiration;
}
