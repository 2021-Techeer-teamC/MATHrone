package mathrone.backend.controller;

import mathrone.backend.domain.*;
import mathrone.backend.service.MainPageService;
import mathrone.backend.service.WorkBookServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
public class MainPageController {

    private final MainPageService mainPageService;
    private final WorkBookServiceImpl workBookService;

    public MainPageController(MainPageService mainPageService, WorkBookServiceImpl workBookService) {
        this.mainPageService = mainPageService;
        this.workBookService = workBookService;
    }

    @GetMapping("/main/workbook/try") // 상위 랭킹 정보를 가져옴
    public List<userWorkbookData> gettryinglist(){
        return mainPageService.getTryingBook(1);
    }

    @GetMapping("/main/workbook/test") // No mapping for GET
    public Integer getTryingTest(){
        return 3;
    }

    @GetMapping("/main/workbook/star") // 좋아요 누른 문제집의 정보
    public List<userWorkbookData> getStarList(@RequestParam(value="userId", required = false) Integer userId) {

        //내보낼 결과를 저장할 리스트
        List<userWorkbookData> result = new ArrayList<userWorkbookData>();

        //특정 유저가 좋아요를 누른 정보를 가져오기
        List<UserWorkbookRelInfo> userStarBookId = mainPageService.getStarBook(userId);

        //책 하나하나(workbookId)를 가져와서
        for (UserWorkbookRelInfo wd: userStarBookId) {
            WorkBookInfo wb = mainPageService.getWorkbookByWorkbookId(wd.getWorkbookId());//workbookid만 추출해서 책전체 정보를 가져오기
            String level = workBookService.getLevel(wd.getWorkbookId());// level정보를 가져오기
            //책정보를 채워넣고 star는 무조건 true(이미 true인것만 가져옴)
            userWorkbookData r = new userWorkbookData(wb.getWorkbookId(), wb.getTitle(), wb.getPublisher(), wb.getProfileImg(),level, true);
            result.add(r);
        }

        return result;
    }

}
