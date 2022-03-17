package mathrone.backend.service;

import mathrone.backend.domain.Problem;
import mathrone.backend.domain.PubCatPair;
import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.domain.WorkbookLevelInfo;
import org.apache.commons.lang3.tuple.Pair;

import java.util.List;
import java.util.Map;

public interface WorkbookService {

    public List<WorkBookInfo> findWorkbook(String publisher, String category);

    public Long countWorkbook(String publisher, String category);

    public String getLevel(String workbookId);

    public Long getStar(String workbookId);

    public List<Problem> findProblem(String workbookId, String chapterId);

    public List<PubCatPair> getPublisherAndCategoryList();
}
