package mathrone.backend.controller;

import mathrone.backend.domain.BookInfoDTO;
import mathrone.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WorkbookController {

    private final BookService bookService;

    @Autowired
    public WorkbookController(BookService bookService){
        this.bookService = bookService;
    }

    @GetMapping("/workbook") // 모든 워크북 조회(Books page)
    public List<BookInfoDTO> bookList(@RequestParam(value="publisher", required = false, defaultValue = "all") String publisher){ //
        BookInfoDTO bookInfo1 = new BookInfoDTO(1, "모의고사", "bc", "평가원", "1");
        BookInfoDTO bookInfo2 = new BookInfoDTO(2, "수능", "bc", "EBS", "2");
        BookInfoDTO bookInfo3 = new BookInfoDTO(3, "수능완성", "bc", "교육청", "3");
        bookService.add(bookInfo1);
        bookService.add(bookInfo2);
        bookService.add(bookInfo3);
        return bookService.findPublisher(publisher);
        //return bookService.searchAll();
    }

    /*@GetMapping("/workbook/{publisher}")
    public List<BookInfoDTO> publisherList(@PathVariable("publisher") String publisher){
        BookInfoDTO bookInfo1 = new BookInfoDTO(1, "모의고사", "bc", "평가원", "1");
        BookInfoDTO bookInfo2 = new BookInfoDTO(2, "수능", "bc", "EBS", "2");
        BookInfoDTO bookInfo3 = new BookInfoDTO(3, "수능완성", "bc", "교육청", "3");
        bookService.add(bookInfo1);
        bookService.add(bookInfo2);
        bookService.add(bookInfo3);
        return bookService.findPublisher(publisher);
    }*/
}
