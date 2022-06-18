package mathrone.backend.controller;

import mathrone.backend.domain.UserInfo;
import mathrone.backend.service.MainPageService;
import mathrone.backend.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    //http ~ /myprofile?userId={}
    @GetMapping("/myprofile")
    public UserInfo getProfile(@RequestParam(value="userId", required = false) Integer userId){
        return profileService.getProfile(userId);
    }


}
