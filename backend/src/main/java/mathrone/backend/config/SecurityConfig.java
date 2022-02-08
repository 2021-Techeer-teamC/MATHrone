package mathrone.backend.config;

import lombok.RequiredArgsConstructor;
import mathrone.backend.login.JwtAccessDeniedHandler;
import mathrone.backend.login.JwtAuthenticationEntryPoint;
import mathrone.backend.login.TokenProvider;
import mathrone.backend.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomUserDetailsService customUserDetailsService;
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // providerManager에 customizing한 provider 등록
//        auth.authenticationProvider(tokenProvider);
        // user password decode
//        auth.userDetailsService(customUserDetailsService).passwordEncoder(new BCryptPasswordEncoder());

        // test user 추가 ( noop은 password 저장 시 암호화하지 않는다는 의미)
//        auth.inMemoryAuthentication()
//                .withUser("oh").password("{noop}1234").roles("USER").and()
//                .withUser("admin").password("{noop}admin").roles("ADMIN");
//    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        // ACL(access control list)에 url 추가
        web.ignoring().antMatchers("/workbook/**"); // 문제 조회 test를 위해 인증없이 허가
//        web.ignoring().anyRequest();
    }

    protected void configure(HttpSecurity http) throws Exception {
    // login customizing
//        http
//            .formLogin()
//            .loginPage("/user/login")    // login page url
//            .permitAll()
//            .loginProcessingUrl("/user/auth")       // view form의 action과 일치시키기
//            .failureUrl("/user/login?result=fail")  // login fail redirect
//            .defaultSuccessUrl("/",true)    // login success
//            .usernameParameter("userId")            // login request시 id parameter
//            .passwordParameter("password");         // login request password parameter

    // logout customizing
//        http
//            .logout()
//            .logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
//            .logoutSuccessUrl("/")
//            .invalidateHttpSession(true);

//        JwtAuthenticationFilter jwtFilter = new JwtAuthenticationFilter(tokenProvider);
//        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        // csrf로 인한 forbidden error 방지
        http.csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // 시큐리티는 기본적으로 세션을 사용
                // 여기서는 세션을 사용하지 않기 때문에 세션 설정을 Stateless 로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests()
                .antMatchers("/user/**").permitAll()
                .anyRequest().authenticated()

                .and()
                .apply(new JwtSecurityConfig(tokenProvider))

        ;// 기본 보안 정책
//                .and().rememberMe().key("rememberMe")
//                .userDetailsService(customUserDetailsService)

//                .mvcMatchers("/", "/info").permitAll()   // /, /info 요청에 대해서는 모두 허용
//                .mvcMatchers("/admin").hasRole("ADMIN")  // /admin 요청에 대해서는 Role이 ADMIN인 사용자만 허용
    }

}
