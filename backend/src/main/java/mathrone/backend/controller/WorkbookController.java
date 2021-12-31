package mathrone.backend.controller;

import mathrone.backend.domain.BookInfoDTO;
import mathrone.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<BookInfoDTO> bookList(@RequestParam(value="publisher", required = false, defaultValue = "all") String publisher){
        return bookService.findPublisher(publisher);
    }
}
