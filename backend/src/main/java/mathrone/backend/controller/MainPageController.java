package mathrone.backend.controller;

import lombok.RequiredArgsConstructor;
import mathrone.backend.domain.userWorkbookData;
import mathrone.backend.service.MainPageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class MainPageController {

    private final MainPageService mainPageService;

    public MainPageController(MainPageService mainPageService) {
        this.mainPageService = mainPageService;
    }

    @GetMapping("/main/workbook/try") // 상위 랭킹 정보를 가져옴
    public List<userWorkbookData> getTryingList(@RequestParam(value="userId", required = false) Integer userId){
        return mainPageService.getTryingBook(userId);
    }

    @GetMapping("/main/workbook/star")
    public List<userWorkbookData> getStarList(@RequestParam(value="userId", required = false) Integer userId){
        return mainPageService.getStarBook(userId);
    }
}
