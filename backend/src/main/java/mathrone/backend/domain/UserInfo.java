package mathrone.backend.domain;

import com.sun.istack.NotNull;
import com.vladmihalcea.hibernate.type.array.IntArrayType;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.TypeDef;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Table(name = "user_info")
@TypeDef(name = "int-array", typeClass = IntArrayType.class)
public class UserInfo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) //JPA 사용시 필요)
    @Column(name = "user_id")
    private int userId;

    @NotNull
    private String id;

    @NotNull
    private String password;

    @NotNull
    private String nickname;

    @Column(name = "user_img")
    private String profileImg;

    @NotNull
    private int exp = 0;

    @NotNull
    private boolean premium;

    @NotNull
    private String email;

    @Column(name = "phone_num")
    private String phoneNum;

    private String role;

    public String getId() {
        return id;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password){ this.password = password;}
    public void setId(String id) { this.id = id; }
    public void setNickname(String nickname) { this.nickname = nickname;}
    public void setExp(int i) { this.exp = i;}
    public void setPremium(boolean b) { this.premium = b;}
    public void setEmail(String email) { this.email = email;}
}
