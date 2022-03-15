package mathrone.backend.repository;

import mathrone.backend.domain.Problem;
import mathrone.backend.domain.StarInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StarRepository extends JpaRepository<StarInfo, Long> {

    //결과의 수 반환
//    Long countByWorkbookId(Short workbookId);

}
