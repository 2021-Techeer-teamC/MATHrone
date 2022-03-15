package mathrone.backend.service;

import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.domain.WorkbookLevelInfo;

import java.util.List;

public interface WorkbookService {

    public List<WorkBookInfo> findWorkbook(String publisher, String category);

    public Long countWorkbook(String publisher, String category);

    public String getLevel(String workbookId);

//    public Long getLike(String workbookId);
}
