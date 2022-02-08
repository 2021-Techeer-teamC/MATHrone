package mathrone.backend.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mathrone.backend.domain.UserInfo;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {

    private String email;
    private String password;
    private String id;
    private String nickname;


    public UserInfo toUser(PasswordEncoder passwordEncoder){
        return UserInfo.builder()
                .id(id)
                .nickname(nickname)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role("ROLE_USER")
                .build();
    }
}
