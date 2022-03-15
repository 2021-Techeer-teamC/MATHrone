package mathrone.backend.domain;

import jnr.ffi.annotations.In;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Table(name = "workbook_level")
public class WorkbookLevelInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //JPA 사용시 필요
    @Column(name = "workbook_level_id")
    private int workbookLevelId;

    @Column(name = "low_cnt")
    private int lowCnt;

    @Column(name = "mid_cnt")
    private int midCnt;

    @Column(name = "high_cnt")
    private int highCnt;

    @Column(name = "workbook_id")
    private String workbookId;


    public int getHighCnt() {
        return highCnt;
    }

    public int getLowCnt() {
        return lowCnt;
    }

    public int getMidCnt() {
        return midCnt;
    }

    public int getWorkbookLevelId(){
        return workbookLevelId;
    }

    public String getWorkbookId() {
        return workbookId;
    }
}
