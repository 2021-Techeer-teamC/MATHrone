package mathrone.backend.repository;

import mathrone.backend.domain.WorkBookInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkBookRepository extends JpaRepository<WorkBookInfo, Long>{
    List<WorkBookInfo> findByPublisher(String publisher);


    // user_id에 따라서 시도한 문제의 수를 조회하는 함수
}
