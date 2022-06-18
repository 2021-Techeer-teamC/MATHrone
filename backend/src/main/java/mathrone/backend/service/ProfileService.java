package mathrone.backend.service;

import mathrone.backend.domain.UserInfo;
import mathrone.backend.repository.*;

public class ProfileService {

    private final UserRepository userRepository;


    public ProfileService(UserRepository userRepository) {
        this.userRepository=userRepository;
    }

    //userId를 받아와서 전송
    public UserInfo getProfile(long userId){
        return userRepository.getById(userId);
    }


}
