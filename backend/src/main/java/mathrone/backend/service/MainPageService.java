package mathrone.backend.service;

import mathrone.backend.controller.dto.CarouselResponseDto;
import mathrone.backend.domain.*;
import mathrone.backend.repository.UserWorkbookRelRepository;
import mathrone.backend.repository.WorkBookRepository;
import mathrone.backend.repository.WorkbookLevelRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Service
public class MainPageService {
    private final UserWorkbookRelRepository workBookRelRepository;
    private final WorkBookRepository workBookRepository;
    private final WorkbookLevelRepository workbookLevelRepository;

    public MainPageService(UserWorkbookRelRepository workBookRelRepository, WorkBookRepository workBookRepository, WorkbookLevelRepository workbookLevelRepository) {
        this.workBookRelRepository = workBookRelRepository;
        this.workBookRepository = workBookRepository;
        this.workbookLevelRepository = workbookLevelRepository;
    }

    public List<userWorkbookData> getTryingBook(int userId){
        List<userWorkbookData> result = new ArrayList<userWorkbookData>();
        for(UserWorkbookRelInfo userWorkbookRelInfo: workBookRelRepository.findByUserIdAndWorkbookTry(1)){
            WorkBookInfo workBookInfo = workBookRepository.findByWorkbookId(userWorkbookRelInfo.getWorkbookId());
            WorkbookLevelInfo workbookLevelInfo = workbookLevelRepository.findByWorkbookId(workBookInfo.getWorkbookId());
            int low = workbookLevelInfo.getLowCnt();
            int mid = workbookLevelInfo.getMidCnt();
            int high = workbookLevelInfo.getHighCnt();
            String b;
            if (low > mid){
                if (low > high)
                    b = "1";
                else
                    b = "3";
            }
            else {
                if (mid > high)
                    b = "2";
                else
                    b = "3";
            }
            userWorkbookData a = new userWorkbookData(workBookInfo.getWorkbookId(), workBookInfo.getTitle(), workBookInfo.getProfileImg(), workBookInfo.getPublisher(), b, userWorkbookRelInfo.getWorkbookStar());
            result.add(a);
        }
        return result;
    }

    public List<CarouselResponseDto> getCarousel() {
        List<WorkBookInfo> booklist = workBookRepository.findAll();
        List<CarouselResponseDto> listToCarousel = new LinkedList<>();
        while(!booklist.isEmpty())
            listToCarousel.add(booklist.remove(0).toCarousel());
        return listToCarousel;
    }
}
