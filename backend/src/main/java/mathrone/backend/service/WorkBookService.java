package mathrone.backend.service;

import mathrone.backend.domain.Problem;
import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.domain.WorkbookLevelInfo;

import java.util.List;

public interface WorkbookService {

    public List<WorkBookInfo> findWorkbook(String publisher, String category);

    public Long countWorkbook(String publisher, String category);

    public String getLevel(String workbookId);

    public Long getStar(String workbookId);

    public List<Problem> findProblem(String workbookId, String chapterId);
}
