package mathrone.backend.service;

import mathrone.backend.domain.PubCatPair;
import mathrone.backend.domain.WorkBookInfo;
import org.springframework.data.domain.Pageable;
import java.util.List;

interface WorkbookService {

    public List<WorkBookInfo> findWorkbook(String publisher, String category, Pageable pageable);

    public Long countWorkbook(String publisher, String category);

    public String getLevel(String workbookId);

    public Long getStar(String workbookId);

    public List<PubCatPair> getPublisherAndCategoryList();
}
