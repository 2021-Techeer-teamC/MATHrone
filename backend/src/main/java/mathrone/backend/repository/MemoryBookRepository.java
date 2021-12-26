package mathrone.backend.repository;

import mathrone.backend.domain.BookInfoDTO;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class MemoryBookRepository implements BookRepository {
    private static Map<Integer, BookInfoDTO> store = new HashMap<>();

    @Override
    public void save(BookInfoDTO bookInfoDTO) {
        store.put(bookInfoDTO.getWorkbook_id(), bookInfoDTO);
    }

    @Override
    public List<BookInfoDTO> findByPublisher(String publisher) {
        return new ArrayList<>(store.values());
    }

    @Override
    public List<BookInfoDTO> findAll() {
        return new ArrayList<>(store.values());
    }
}
