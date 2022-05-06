package mathrone.backend.domain;

import com.sun.istack.NotNull;
import com.vladmihalcea.hibernate.type.array.IntArrayType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Table(name = "user_info")
@TypeDef(name = "int-array", typeClass = IntArrayType.class)
@Getter
@Setter
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

    @Column(name = "profile_img")
    private String profileImg;

    @NotNull
    private int exp = 0;

    @NotNull
    private boolean premium;

    @NotNull
    private String email;

    @Column(name = "phone_num")
    private String phoneNum;

    @Column(name = "user_img")
    private String userImg;
  
    private String role;

    @Builder
    public UserInfo(String email, String password, String role, String id, String nickname) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.id = id;
        this.nickname = nickname;
    }
  
    public int getUserId() {
        return userId;
    }

    public void setUser_id(int user_id) {
        this.userId = user_id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfileImg() {
        return profileImg;
    }

    public void setProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public Boolean getPremium() {
        return premium;
    }

    public void setPremium(Boolean premium) {
        this.premium = premium;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getUserImg() {
        return userImg;
    }

    public void setUserImg(String userImg) {
        this.userImg = userImg;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
