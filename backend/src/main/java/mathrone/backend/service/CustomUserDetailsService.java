package mathrone.backend.service;

import mathrone.backend.domain.UserInfo;
import mathrone.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


/*
Repository를 통해 database로부터 필요한 user 정보를 가져오는 service
*/
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String Id) throws UsernameNotFoundException {
        UserInfo isExist = userRepository.findById(Id).orElseThrow( () ->
                new UsernameNotFoundException("not found"));

        return User.builder()
            .username(isExist.getId())
            .password(isExist.getPassword())
            .roles("USER")
            .build();
    }

    public void signUp(UserInfo user){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public List<UserInfo> allUser(){
        return userRepository.findAll();
    }
}
