package mathrone.backend.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mathrone.backend.domain.UserInfo;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private String email;

    public static UserResponseDto of(UserInfo userInfo){
        return new UserResponseDto(userInfo.getEmail());
    }
}
