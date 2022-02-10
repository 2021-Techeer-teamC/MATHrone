package mathrone.backend.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mathrone.backend.domain.UserInfo;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {

    private String email;
    private String password;
    private String id;
    private String nickname;
    private String token;

    public UserInfo toUser(PasswordEncoder passwordEncoder){
        return UserInfo.builder()
                .id(id)
                .nickname(nickname)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role("ROLE_USER")
                .build();
    }

    public UsernamePasswordAuthenticationToken of(){
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}
