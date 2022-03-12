package mathrone.backend.controller;

import mathrone.backend.domain.Problem;
import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.service.WorkBookServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WorkbookController {

    private final WorkBookServiceImpl workBookService;

    public WorkbookController(WorkBookServiceImpl workBookService){
        this.workBookService = workBookService;
    }

    @GetMapping("/workbook") // 모든 워크북 조회(Books page)
    public List<WorkBookInfo> bookList(@RequestParam(value="publisher", required = false, defaultValue = "all") String publisher,
                                       @RequestParam(value="sortType", required = false, defaultValue = "star") String sortType,
                                       @RequestParam(value="pageNum", required = false, defaultValue = "1") int pageNum,
                                       @RequestParam(value="category", required = false, defaultValue = "all") String category){
        return workBookService.findWorkbook(publisher,category);
    }

//    @GetMapping("/problems") // 모든 문제 조회(Books page)
//    public List<Problem> problemList(@RequestParam(value="workbookId") String workbookId,
//                                     @RequestParam(value="chapterId") String chapterId){
//        return workBookService.findProblem(workbookId,chapterId);
//    }

}
