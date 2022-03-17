package mathrone.backend.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@Table(name = "refreshtoken")
@Entity
public class RefreshToken {

    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "expiration")
    private Date expiration;

    @Builder
    public RefreshToken(String userid,String refreshToken, Date expiration) {
        this.userId = userid;
        this.refreshToken = refreshToken;
        this.expiration = expiration;
    }

    public RefreshToken updateValue(String refreshToken, Date expiration) {
        this.refreshToken = refreshToken;
        this.expiration = expiration;
        return this;
    }

    public RefreshRedis transferRedisToken() {
        return RefreshRedis.builder()
                .userId(this.userId)
                .refreshToken(this.refreshToken)
                .expiration(this.expiration.getTime())
                .build();
    }

}
