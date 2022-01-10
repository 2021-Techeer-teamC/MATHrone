package mathrone.backend.domain;
import com.sun.istack.NotNull;
import com.vladmihalcea.hibernate.type.array.IntArrayType;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;


@NoArgsConstructor
@Entity
@Table(name = "workbook")
@TypeDef(name = "int-array", typeClass = IntArrayType.class)
public class BookInfoDTO {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) //JPA 사용시 필요
    @Column(name = "workbook_id")
    private int workbook_id;

    @Column(name = "title")
    @NotNull
    private String title;

    @Column(name = "publisher")
    @NotNull
    private String publisher;

    @Column(name = "profile_img")
    @NotNull
    private String profile_img;

    @Column(name = "content")
    @NotNull
    private String content;

    @Column(name = "type")
    @NotNull
    private String type;

    @Column(name = "year")
    private Short year;

    @Column(name = "month" )
    private Short month;

    @Column(name="chapter_id")
    @Type(type = "int-array")
    private Integer[] chapter_id;

    public int getWorkbook_id() {
        return workbook_id;
    }

    public String getTitle() {
        return title;
    }

    public String getPublisher() {
        return publisher;
    }

    public String getProfile_img() {
        return profile_img;
    }

    public String getContent() {
        return content;
    }

    public String getType() {
        return type;
    }

    public Short getYear() {
        return year;
    }

    public Short getMonth() {
        return month;
    }

    public Integer[] getChapter_id() {
        return chapter_id;
    }
}
