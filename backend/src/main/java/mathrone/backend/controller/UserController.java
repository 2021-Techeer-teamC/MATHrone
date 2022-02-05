package mathrone.backend.controller;

import mathrone.backend.domain.UserInfo;
import mathrone.backend.login.TokenProvider;
import mathrone.backend.login.UsernamePasswordAuthenticationToken;
import mathrone.backend.service.CustomUserDetailsService;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    private final TokenProvider customAuthenticationProvider;
    private final CustomUserDetailsService customUserDetailsService;

    public UserController(TokenProvider cp, CustomUserDetailsService cs){
        this.customAuthenticationProvider = cp;
        this.customUserDetailsService = cs;
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public Authentication login (@RequestParam(value = "userId") String userId,
                                @RequestParam(value = "userPassword") String userPassword) {
        return customAuthenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(userId,userPassword));
//        UserDetails user = customUserDetailsService.loadUserByUsername(userId);
//        if (user.getPassword().equals(userPassword)){
//            return user;
//        } else throw new Exception("password error");
    }

    @PostMapping(value = "/signup", headers = {"Content-type=application/json"})
    public String signUp(@RequestBody Map<String,String> info){
        UserInfo user = new UserInfo();
        user.setId(info.get("id"));
        user.setPassword(info.get("password"));
        user.setNickname(info.get("nickname"));
        user.setExp(0);
        user.setPremium(false);
        user.setEmail(info.get("email"));
        customUserDetailsService.signUp(user);
        return "redirect:/login";
    }

    @GetMapping(value = "/all")
    public List<UserInfo> allUser(){
        return customUserDetailsService.allUser();
    }
}
