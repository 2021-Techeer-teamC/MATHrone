package mathrone.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import mathrone.backend.domain.*;
import mathrone.backend.repository.UserWorkbookRelRepository;
import mathrone.backend.repository.WorkBookRepository;
import mathrone.backend.repository.WorkbookLevelRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<itemData> getTryingBook(int userId){
        List<itemData> result = new ArrayList<itemData>();
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
            itemData a = new itemData(workBookInfo.getWorkbookId(), workBookInfo.getTitle(), workBookInfo.getProfileImg(), workBookInfo.getPublisher(), b, userWorkbookRelInfo.getWorkbookStar());
            result.add(a);
        }
        return result;
    }
}
