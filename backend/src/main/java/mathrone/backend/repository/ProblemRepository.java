package mathrone.backend.repository;

import mathrone.backend.domain.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {
    List<Problem> findByWorkbookIdAndChapterId(String workbookId, String chapterId);

    Problem findByProblemId(String problemId);

    @Query(value = "SELECT DISTINCT ON (problem_id) * FROM problem WHERE problem_id in (SELECT problem_id FROM problem_try order by created_at asc) limit 10", nativeQuery = true)
    List<Problem> findByRecentTry(); // 가장 최근에 시도한 문제 10개 반환
}
