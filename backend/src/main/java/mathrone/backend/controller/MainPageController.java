package mathrone.backend.controller;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.google.gson.JsonArray;
import mathrone.backend.domain.itemData;
import mathrone.backend.service.MainPageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class MainPageController {

    private final MainPageService mainPageService;

    public MainPageController(MainPageService mainPageService) {
        this.mainPageService = mainPageService;
    }

    @GetMapping("/main/workbook/try") // 상위 랭킹 정보를 가져옴
    public List<itemData> gettryinglist(){
        return mainPageService.getTryingBook(1);
    }
}