package mathrone.backend.service;

import mathrone.backend.domain.WorkBookInfo;

import java.util.List;

public interface WorkbookService {

    public List<WorkBookInfo> findWorkbook(String publisher, String category);

}
