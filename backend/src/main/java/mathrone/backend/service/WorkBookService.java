package mathrone.backend.service;

import mathrone.backend.domain.Problem;
import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.repository.ProblemRepository;
import mathrone.backend.repository.WorkBookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkBookService {

    private final WorkBookRepository workBookRepository;
    private final ProblemRepository problemRepository;

    public WorkBookService(WorkBookRepository workBookRepository, ProblemRepository problemRepository){
        this.workBookRepository = workBookRepository;
        this.problemRepository = problemRepository;
    }

    public void add(WorkBookInfo workBookInfo) {
        workBookRepository.save(workBookInfo);
    }

    public  List<WorkBookInfo> findPublisher(String publisher) {
        if (publisher.equals("all"))
            return workBookRepository.findAll();
        else
            return workBookRepository.findByPublisher(publisher);
    }

    public List<Problem> findProblem(String workbookId, String chapterId){
        return problemRepository.findByWorkbookIdAndChapterId(workbookId, chapterId);
    }

}
