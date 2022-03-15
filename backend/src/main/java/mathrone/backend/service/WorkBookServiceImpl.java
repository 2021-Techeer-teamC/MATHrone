package mathrone.backend.service;

import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.domain.WorkbookLevelInfo;
import mathrone.backend.repository.LevelRepository;
import mathrone.backend.repository.StarRepository;
import mathrone.backend.repository.WorkBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkBookServiceImpl implements WorkbookService{

    //레포지토리 -> db에 접근
    private final WorkBookRepository workBookRepository;
    private final LevelRepository levelRepository;

    //생성자
    @Autowired
    public WorkBookServiceImpl(WorkBookRepository workBookRepository, LevelRepository levelRepository){
        this.workBookRepository = workBookRepository;
        this.levelRepository = levelRepository;
    }


    @Override
    public  List<WorkBookInfo> findWorkbook(String publisher, String category) {
        if (publisher.equals("all"))
            return workBookRepository.findAll();
        else if(category.equals("all"))
            return workBookRepository.findByPublisher(publisher);
        else
            return workBookRepository.findByPublisherAndCategory(publisher, category);
    }

    @Override
    public Long countWorkbook(String publisher, String category) {
        if (publisher.equals("all"))
            return workBookRepository.count();
        else if(category.equals("all"))
            return workBookRepository.countByPublisher(publisher);
        else
            return workBookRepository.countByPublisherAndCategory(publisher, category);
    }

    @Override
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

//    @Override
//    public Long getLike(String workbookId){
//        return StarRepository.countByWorkbookId(workbookId);
//    }




    //workbook service와 problemservice가 왜 함께 있는지..!?
//    private final ProblemRepository problemRepository;

//    public List<Problem> findProblem(String workbookId, String chapterId){
//        return problemRepository.findByWorkbookIdAndChapterId(workbookId, chapterId);
//    }

}
