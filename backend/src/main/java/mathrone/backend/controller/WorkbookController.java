package mathrone.backend.controller;

import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.service.WorkBookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WorkbookController {

    private final WorkBookService workBookService;

    public WorkbookController(WorkBookService workBookService){
        this.workBookService = workBookService;
    }

    @GetMapping("/workbook") // 모든 워크북 조회(Books page)
    public List<WorkBookInfo> bookList(@RequestParam(value="publisher", required = false, defaultValue = "all") String publisher){
        return workBookService.findPublisher(publisher);
    }
}
