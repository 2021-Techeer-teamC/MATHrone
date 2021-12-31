package mathrone.backend.repository;

import mathrone.backend.domain.BookInfoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<BookInfoDTO, Long>{
    List<BookInfoDTO> findByPublisher(String publisher);
}
