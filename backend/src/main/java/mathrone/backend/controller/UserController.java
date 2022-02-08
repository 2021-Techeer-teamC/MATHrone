package mathrone.backend.controller;

import mathrone.backend.controller.dto.TokenDto;
import mathrone.backend.controller.dto.UserRequestDto;
import mathrone.backend.controller.dto.UserResponseDto;
import mathrone.backend.domain.UserInfo;
import mathrone.backend.login.TokenProvider;
import mathrone.backend.service.AuthService;
import mathrone.backend.service.CustomUserDetailsService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final TokenProvider customAuthenticationProvider;
    private final AuthService authService;

    public UserController(TokenProvider cp, AuthService as){
        this.customAuthenticationProvider = cp;
        this.authService = as;
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TokenDto> login (@RequestBody UserRequestDto userRequestDto) {

        return ResponseEntity.ok(authService.login(userRequestDto));
//        return customAuthenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(userId,userPassword));
    }

    @PostMapping(value = "/signup", headers = {"Content-type=application/json"})
    public ResponseEntity<UserResponseDto> signUp(@RequestBody UserRequestDto userRequestDto){
        return ResponseEntity.ok(authService.signup(userRequestDto));

//        UserInfo user = new UserInfo();
//        user.setId(info.get("id"));
//        user.setPassword(info.get("password"));
//        user.setNickname(info.get("nickname"));
//        user.setExp(0);
//        user.setPremium(false);
//        user.setEmail(info.get("email"));
////        customUserDetailsService.signUp(user);
//        return "redirect:/login";
    }

//    @GetMapping(value = "/all")
//    public List<UserInfo> allUser(){
//        return customUserDetailsService.allUser();
//    }
}
