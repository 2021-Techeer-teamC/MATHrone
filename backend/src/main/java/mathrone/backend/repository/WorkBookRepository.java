package mathrone.backend.repository;

import mathrone.backend.domain.WorkBookInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkBookRepository extends JpaRepository<WorkBookInfo, Long>{
    List<WorkBookInfo> findByPublisher(String publisher);

    //@Query 어노테이션으로 직접 쿼리 작성
    @Query(value = "SELECT nickname FROM user_info WHERE user_id=:user_id", nativeQuery = true)
    String getNickname(int user_id);
    // user_id를 통해서 user_nickname 조회

    @Query(value = "SELECT COUNT(*) FROM problem_try WHERE user_id=:user_id GROUP BY user_id", nativeQuery = true)
    int getTryByUserID(int user_id);
    // user_id에 따라서 시도한 문제의 수를 조회하는 함수
}
