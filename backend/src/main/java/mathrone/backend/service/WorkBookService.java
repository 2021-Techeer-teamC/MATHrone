package mathrone.backend.service;

import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.repository.WorkBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkBookService {

    private final WorkBookRepository workBookRepository;

    public WorkBookService(WorkBookRepository workBookRepository){
        this.workBookRepository = workBookRepository;
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
}
