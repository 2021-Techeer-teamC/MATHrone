package mathrone.backend.repository;

import mathrone.backend.domain.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findById(String userId);
    boolean existsByEmail(String email);
}
