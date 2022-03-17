package mathrone.backend.repository;

import mathrone.backend.domain.PubCatPair;
import mathrone.backend.domain.WorkBookInfo;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.TemporalType;
import java.util.List;
import java.util.Map;

@Repository
public interface WorkBookRepository extends JpaRepository<WorkBookInfo, Long> {

    //전체 문제집
    List<WorkBookInfo> findAll();

    //publisher를 이용하여 workbook을 찾는 기능 -> category가 관계(all) 없는 경우
    List<WorkBookInfo> findByPublisher(String publisher);

    //publisher와 category를 이용하여 workbook을 찾는 기능 -> Workbook Info 타입의 리스트를 반환
    List<WorkBookInfo> findByPublisherAndCategory(String publisher, String category);

    //결과의 수 반환
    Long countByPublisher(String publisher);
    Long countByPublisherAndCategory(String publisher, String category);

    @Query( value = "SELECT publisher, category FROM workbook GROUP BY publisher, category", nativeQuery = true)
    List<PubCatPair> findGroupByPublisherAndCategory();
}
