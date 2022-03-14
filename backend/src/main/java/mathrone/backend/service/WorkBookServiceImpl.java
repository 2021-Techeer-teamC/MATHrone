package mathrone.backend.service;

import mathrone.backend.domain.Problem;
import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.repository.ProblemRepository;
import mathrone.backend.repository.WorkBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkBookServiceImpl implements WorkbookService{

    //레포지토리 -> db에 접근
    private final WorkBookRepository workBookRepository;


    //생성자
    @Autowired
    public WorkBookServiceImpl(WorkBookRepository workBookRepository){
        this.workBookRepository = workBookRepository;
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



    //workbook service와 problemservice가 왜 함께 있는지..!?
//    private final ProblemRepository problemRepository;

//    public List<Problem> findProblem(String workbookId, String chapterId){
//        return problemRepository.findByWorkbookIdAndChapterId(workbookId, chapterId);
//    }

}
