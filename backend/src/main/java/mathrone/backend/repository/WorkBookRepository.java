package mathrone.backend.repository;

import mathrone.backend.domain.WorkBookInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkBookRepository extends JpaRepository<WorkBookInfo, Long>{
    List<WorkBookInfo> findByPublisher(String publisher);
    WorkBookInfo findByWorkbookId(String workbookId);
}
