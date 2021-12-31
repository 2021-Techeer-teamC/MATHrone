package mathrone.backend.service;

import mathrone.backend.domain.BookInfoDTO;
import mathrone.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    public void add(BookInfoDTO bookInfoDTO) {
        bookRepository.save(bookInfoDTO);
    }

    public  List<BookInfoDTO> findPublisher(String publisher) {
        if (publisher.equals("all"))
            return bookRepository.findAll();
        else
            return bookRepository.findByPublisher(publisher);
    }
}