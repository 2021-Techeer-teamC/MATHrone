package mathrone.backend.service;

import com.google.api.client.auth.oauth2.RefreshTokenRequest;
import lombok.RequiredArgsConstructor;
import mathrone.backend.controller.dto.TokenDto;
import mathrone.backend.controller.dto.UserRequestDto;
import mathrone.backend.controller.dto.UserResponseDto;
import mathrone.backend.domain.RefreshToken;
import mathrone.backend.domain.UserInfo;
import mathrone.backend.login.TokenProvider;
import mathrone.backend.login.UsernamePasswordAuthenticationToken;
import mathrone.backend.repository.RefreshTokenRepository;
import mathrone.backend.repository.UserRepository;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public UserResponseDto signup(UserRequestDto userRequestDto){
        if (userRepository.existsByEmail(userRequestDto.getEmail())){
            throw new RuntimeException("이미 가입된 유저입니다.");
        }
        UserInfo newUser = userRequestDto.toUser(passwordEncoder);
        return UserResponseDto.of(userRepository.save(newUser));
    }

    @Transactional
    public TokenDto login(UserRequestDto userRequestDto){
//        Authentication authentication = tokenProvider.authenticate(userRequestDto.toAuthentication());
// 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userRequestDto.getEmail(), userRequestDto.getPassword());

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);


        TokenDto tokenDto = tokenProvider.generateToken(authentication);

        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

//        refreshTokenRepository.save(refreshToken);

        return tokenDto;
    }


}
