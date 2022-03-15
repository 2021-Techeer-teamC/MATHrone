package mathrone.backend.controller;

import mathrone.backend.domain.Problem;
import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.domain.bookItem;
import mathrone.backend.service.WorkBookServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class WorkbookController {

    private final WorkBookServiceImpl workBookService;

    public WorkbookController(WorkBookServiceImpl workBookService){
        this.workBookService = workBookService;
    }

    @GetMapping("/workbook") // 모든 워크북 조회(Books page)
    public List<bookItem> bookList(@RequestParam(value="publisher", required = false, defaultValue = "all") String publisher,
                             @RequestParam(value="sortType", required = false, defaultValue = "star") String sortType,
                             @RequestParam(value="pageNum", required = false, defaultValue = "1") int pageNum,
                             @RequestParam(value="category", required = false, defaultValue = "all") String category){


        //결과로 반환할 bookItem 리스트 (임시)
        List<bookItem> result = new ArrayList<bookItem>();

        //파라미터 기반으로 결과 탐색
        List<WorkBookInfo> res = workBookService.findWorkbook(publisher,category);


        //결과에 level,like을 attach하여 리스트로 생성
        for (WorkBookInfo wb: res) {
            String level = workBookService.getLevel(wb.getWorkbookId());
            Long like = workBookService.getLike(wb.getWorkbookId());
            bookItem b = new bookItem(wb.getWorkbookId(), wb.getTitle(), wb.getPublisher(), wb.getProfileImg(),level, like);
            result.add(b);
        }

        System.out.println(result);

        return result;
    }

    @GetMapping("/problems") // 모든 문제 조회(Books page)
    public List<Problem> problemList(@RequestParam(value="workbookId") String workbookId,
                                     @RequestParam(value="chapterId") String chapterId){
        return workBookService.findProblem(workbookId,chapterId);
    }

}
