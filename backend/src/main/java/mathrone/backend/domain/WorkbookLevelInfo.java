package mathrone.backend.domain;

import com.sun.istack.NotNull;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Entity
@Table(name = "workbook_level")
public class WorkbookLevelInfo {
    @Id
    @Column(name = "workbook_level_id")
    int workbookLevelId;

    @NotNull
    @Column(name = "low_cnt")
    int lowCnt;

    @NotNull
    @Column(name = "mid_cnt")
    int midCnt;

    @NotNull
    @Column(name = "high_cnt")
    int highCnt;

    @NotNull
    @Column(name = "workbook_id")
    String workbookId;


    public String getWorkbookId() {
        return workbookId;
    }

    public void setWorkbookId(String workbookId) {
        this.workbookId = workbookId;
    }

    public int getWorkbookLevelId() {
        return workbookLevelId;
    }

    public void setWorkbookLevelId(int workbookLevelId) {
        this.workbookLevelId = workbookLevelId;
    }

    public int getLowCnt() {
        return lowCnt;
    }

    public void setLowCnt(int lowCnt) {
        this.lowCnt = lowCnt;
    }

    public int getMidCnt() {
        return midCnt;
    }

    public void setMidCnt(int midCnt) {
        this.midCnt = midCnt;
    }

    public int getHighCnt() {
        return highCnt;
    }

    public void setHighCnt(int highCnt) {
        this.highCnt = highCnt;
    }
}
