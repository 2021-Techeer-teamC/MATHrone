package mathrone.backend.service;

import lombok.RequiredArgsConstructor;
import mathrone.backend.controller.dto.TokenDto;
import mathrone.backend.controller.dto.TokenRequestDto;
import mathrone.backend.controller.dto.UserRequestDto;
import mathrone.backend.controller.dto.UserResponseDto;
import mathrone.backend.domain.RefreshToken;
import mathrone.backend.domain.UserInfo;
import mathrone.backend.login.TokenProvider;
import mathrone.backend.repository.RefreshTokenRepository;
import mathrone.backend.repository.UserRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

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
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = userRequestDto.of();

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. token 생성
        TokenDto tokenDto = tokenProvider.generateToken(authentication);

        // 4. refresh token 생성
        RefreshToken refreshToken = tokenProvider.generateRefreshToken(tokenDto);

        // 5. 토큰 저장 테이블에 저장이나, 테스트를 위해 임시로 로컬 저장 방식으로 구현하기.
//        refreshTokenRepository.save(refreshToken);

        return tokenDto;
    }


    @Transactional
    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        // 1. Refresh token 검증
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())){
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져오기
        // 현재 로컬로 구현 예정
//        RefreshToken refreshToken = refreshTokenRepository.findByUserId(authentication.getName())
//                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));
//
//        // 4. Refresh Token 일치 여부 검사
//        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())){
//            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
//        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateToken(authentication);

        // 6. 저장소 정보 업데이트
//        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
//        refreshTokenRepository.save(newRefreshToken);

        return tokenDto;
    }
}
