package mathrone.backend.repository;

import mathrone.backend.domain.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findByEmail(String userId);
    boolean existsByEmail(String email);
    Optional<Void> deleteByEmail(String email);

    //@Query(value = "SELECT nickname FROM user_info WHERE user_id=:user_id", nativeQuery = true)
    UserInfo findByUserId(int userId);

    // user_id를 통해서 user_nickname 조회
    @Query(value = "SELECT COUNT(*) FROM problem_try WHERE user_id=:userId GROUP BY user_id", nativeQuery = true)
    int getTryByUserID(int userId);
}
