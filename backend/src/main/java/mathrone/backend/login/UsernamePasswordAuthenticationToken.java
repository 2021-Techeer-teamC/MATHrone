package mathrone.backend.login;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;

import java.util.Collection;

public class UsernamePasswordAuthenticationToken extends AbstractAuthenticationToken {
    private static final long serialVersionUID =
            SpringSecurityCoreVersion.SERIAL_VERSION_UID;
    // user id
    private Object principal;
    // user password
    private Object credentials;

    // 인증 전 객체 생성
    public UsernamePasswordAuthenticationToken
            (Object principal, Object credentials){
        super(null);
        this.principal = principal;
        this.credentials = credentials;
        this.setAuthenticated(false);    // 인증 전 객체이므로 인증 여부는 false
    }

    // 인증 후 객체 생성
    public UsernamePasswordAuthenticationToken
            (Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities){
        super(authorities);
        this.principal = principal;
        this.credentials = credentials;
        this.setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return this.credentials;
    }

    @Override
    public Object getPrincipal() {
        return this.principal;
    }
}

