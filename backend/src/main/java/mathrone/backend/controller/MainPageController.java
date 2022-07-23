package mathrone.backend.controller;

import mathrone.backend.controller.dto.CarouselResponseDto;
import mathrone.backend.domain.userWorkbookData;
import mathrone.backend.service.AuthService;
import mathrone.backend.service.MainPageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController

public class MainPageController {

    private final MainPageService mainPageService;
    private final AuthService authService;

    public MainPageController(MainPageService mainPageService,
            AuthService authService) {
        this.mainPageService = mainPageService;
        this.authService = authService;
    }

    @GetMapping("/main/workbook/try")
    public List<userWorkbookData> getTryingList() {
        return mainPageService.getTryingBook(authService.getMyUserId());
    }

    @GetMapping("/main/carousel/list")
    public List<CarouselResponseDto> getCarousel() {
        return mainPageService.getCarousel();
    }

    @GetMapping("/main/workbook/star")
    public List<userWorkbookData> getStarList() {
        return mainPageService.getStarBook(authService.getMyUserId());
    }
}
