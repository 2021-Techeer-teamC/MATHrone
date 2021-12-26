package mathrone.backend.repository;

import mathrone.backend.domain.BookInfoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
//public interface BookRepository extends JpaRepository<BookInfoDTO, Integer> {

//    BookInfoDTO findByPublisher(String publisher);
//}
// 메모리용

public interface BookRepository { //extends JpaRepository<BookInfoDTO, Long>{

    void save(BookInfoDTO bookInfoDTO);
    List<BookInfoDTO> findByPublisher(String publisher);
    List<BookInfoDTO> findAll();
}
