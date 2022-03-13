package mathrone.backend.controller;

import mathrone.backend.domain.Problem;
import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.service.WorkBookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
public class WorkbookController {

    private final WorkBookService workBookService;

    public WorkbookController(WorkBookService workBookService){
        this.workBookService = workBookService;
    }

    @GetMapping("/workbook") // 모든 워크북 조회(Books page)
    public List<WorkBookInfo> bookList(@RequestParam(value="publisher", required = false, defaultValue = "all") String publisher){
        return workBookService.findPublisher(publisher);
    }

    @GetMapping("/problems") // 모든 문제 조회(Books page)
    public List<Problem> problemList(@RequestParam(value="workbookId") String workbookId,
                                     @RequestParam(value="chapterId") String chapterId){
        return workBookService.findProblem(workbookId,chapterId);
    }

}
