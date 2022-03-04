package mathrone.backend.domain;

import com.sun.istack.NotNull;
import com.vladmihalcea.hibernate.type.array.IntArrayType;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Table(name = "problem")
@TypeDef(name = "int-array", typeClass = IntArrayType.class)
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //JPA 사용시 필요
    @Column(name = "problem_id")
    private String problemId;

    @Column(name = "problem_num")
    @NotNull
    private String problemNum;

    @Column(name = "chapter_id")
    @NotNull
    private String chapterId;

    @Column(name = "workbook_id")
    @NotNull
    private String workbookId;

    @Column(name = "problem_img")
    @NotNull
    private String problemImg;

    @Column(name = "level_of_diff")
    private String levelOfDiff;

    public String getProblemId() {
        return problemId;
    }

    public String getProblemNum() {
        return problemNum;
    }

    public String getChapterId() {
        return chapterId;
    }

    public String getWorkbookId() {
        return workbookId;
    }

    public String getProblemImg() {
        return problemImg;
    }

    public String getLevelOfDiff() {
        return levelOfDiff;
    }
}
