package mathrone.backend.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@Table(name = "refresh_token")
@Entity
public class RefreshToken {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) //JPA 사용시 필요)
    @Column(name = "token_id")
    private int tokenId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "valid_util")
    private Date validUtil;

    public RefreshToken updateValue(String refreshToken, Date validUtil) {
        this.refreshToken = refreshToken;
        this.validUtil = validUtil;
        return this;
    }

    @Builder
    public RefreshToken(String userId, String refreshToken, Date validUtil) {
        this.userId = userId;
        this.refreshToken = refreshToken;
        this.validUtil = validUtil;
    }
}
