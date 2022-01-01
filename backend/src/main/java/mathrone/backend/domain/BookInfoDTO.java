package mathrone.backend.domain;
import com.sun.istack.NotNull;
import com.vladmihalcea.hibernate.type.array.IntArrayType;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}
