package mathrone.backend.service;

//import com.google.gson.JsonArray;
//import com.google.gson.JsonObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import mathrone.backend.domain.UserWorkbookRelInfo;
import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.domain.WorkbookLevelInfo;
import mathrone.backend.repository.UserWorkbookRelRepository;
import mathrone.backend.repository.WorkBookRepository;
import mathrone.backend.repository.WorkbookLevelRepository;
import org.springframework.stereotype.Service;

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


    public ArrayNode getTryingBook(int userId){
        ObjectMapper mapper = new ObjectMapper();
        ArrayNode arrayNode = mapper.createArrayNode();
        for(UserWorkbookRelInfo userWorkbookRelInfo: workBookRelRepository.findByUserIdAndWorkbookTry(1)){
            WorkBookInfo workBookInfo = workBookRepository.findByWorkbookId(userWorkbookRelInfo.getWorkbookId());
            ObjectNode temp = mapper.createObjectNode();
            temp.put("workbook_id", workBookInfo.getWorkbookId());
            temp.put("title", workBookInfo.getTitle());
            temp.put("img", workBookInfo.getProfileImg());
            temp.put("publisher",  workBookInfo.getPublisher());
            WorkbookLevelInfo workbookLevelInfo = workbookLevelRepository.findByWorkbookId(workBookInfo.getWorkbookId());
            int low = workbookLevelInfo.getLowCnt();
            int mid = workbookLevelInfo.getMidCnt();
            int high = workbookLevelInfo.getHighCnt();
            if (low > mid){
                if (low > high)
                    temp.put("level", "low");
                else
                    temp.put("level", "high");
            }
            else {
                if (mid > high)
                    temp.put("level", "mid");
                else
                    temp.put("level", "high");
            }
            temp.put("star", userWorkbookRelInfo.getWorkbookStar());
            arrayNode.add(temp);
        }
        return arrayNode;
    }
}
