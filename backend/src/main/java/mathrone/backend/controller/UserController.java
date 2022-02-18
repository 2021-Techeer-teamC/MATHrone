package mathrone.backend.controller;

import lombok.RequiredArgsConstructor;
import mathrone.backend.controller.dto.TokenDto;
import mathrone.backend.controller.dto.TokenRequestDto;
import mathrone.backend.controller.dto.UserRequestDto;
import mathrone.backend.controller.dto.UserResponseDto;
import mathrone.backend.service.AuthService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final AuthService authService;

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TokenDto> login (@RequestBody UserRequestDto userRequestDto) {

        return ResponseEntity.ok(authService.login(userRequestDto));
    }

    @PostMapping(value = "/signup", headers = {"Content-type=application/json"})
    public ResponseEntity<UserResponseDto> signUp(@RequestBody UserRequestDto userRequestDto){
        return ResponseEntity.ok(authService.signup(userRequestDto));
    }

    // 재발급 api
    @PostMapping(value = "/reissue")
    public ResponseEntity<TokenDto> reissue (@RequestBody TokenRequestDto tokenRequestDto){
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }

}
