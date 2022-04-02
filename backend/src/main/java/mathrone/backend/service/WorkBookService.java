package mathrone.backend.service;

import com.google.api.gax.paging.Page;
import mathrone.backend.domain.Problem;
import mathrone.backend.domain.PubCatPair;
import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.domain.WorkbookLevelInfo;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

interface WorkbookService {

    public List<WorkBookInfo> findWorkbook(String publisher, String category, Pageable pageable);

    public Long countWorkbook(String publisher, String category);

    public String getLevel(String workbookId);

    public Long getStar(String workbookId);

    public List<Problem> findProblem(String workbookId, String chapterId);

    public List<PubCatPair> getPublisherAndCategoryList();
}
