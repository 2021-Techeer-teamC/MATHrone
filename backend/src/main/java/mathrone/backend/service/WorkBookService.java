package mathrone.backend.service;

import mathrone.backend.domain.Problem;
import mathrone.backend.domain.PubCatPair;
import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.domain.WorkbookLevelInfo;
import mathrone.backend.repository.LevelRepository;
import mathrone.backend.repository.ProblemRepository;
import mathrone.backend.repository.UserWorkbookRepository;
import mathrone.backend.repository.WorkBookRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkBookService {

    private final WorkBookRepository workBookRepository;
    private final LevelRepository levelRepository;
    private final UserWorkbookRepository userWorkbookRepository;
    private final ProblemRepository problemRepository;

    //생성자

    public WorkBookService(WorkBookRepository workBookRepository, ProblemRepository problemRepository, LevelRepository levelRepository, UserWorkbookRepository userWorkbookRepository){
        this.workBookRepository = workBookRepository;
        this.levelRepository = levelRepository;
        this.userWorkbookRepository = userWorkbookRepository;
        this.problemRepository = problemRepository;
    }


    public List<WorkBookInfo> findWorkbook(String publisher, String category, Pageable pageable) {
        if (publisher.equals("all"))
            return workBookRepository.findAll(pageable).getContent();
        else if(category.equals("all"))
            return workBookRepository.findAllByPublisher(publisher, pageable).getContent();
        else
            return workBookRepository.findAllByPublisherAndCategory(publisher, category, pageable).getContent();
    }

    public Long countWorkbook(String publisher, String category) {
        if (publisher.equals("all"))
            return workBookRepository.count();
        else if(category.equals("all"))
            return workBookRepository.countByPublisher(publisher);
        else
            return workBookRepository.countByPublisherAndCategory(publisher, category);
    }

    public String getLevel(String workbookId){
        //해당 문제집의 레벨투표 정보를 가져옴
        WorkbookLevelInfo wb = levelRepository.findByWorkbookId(workbookId);

        //각 난이도별 투표수
        int high = wb.getHighCnt();
        int mid = wb.getMidCnt();
        int low = wb.getLowCnt();

        //투표수중 최대값
        int maxValue = Math.max(high,Math.max(mid,low));

        if(maxValue==low) return "1";
        else if(maxValue==mid) return "2";
        else return "3";

    }

    public Long getStar(String workbookId){
        return userWorkbookRepository.countByWorkbookIdAndWorkbookStar(workbookId, true); //좋아요 표시 눌린것만
    }


    public List<Problem> findProblem(String workbookId, String chapterId){
        return problemRepository.findByWorkbookIdAndChapterId(workbookId, chapterId);
    }

    public List<PubCatPair> getPublisherAndCategoryList(){
        return workBookRepository.findGroupByPublisherAndCategory();
    }

}
