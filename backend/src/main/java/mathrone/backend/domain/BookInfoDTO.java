package mathrone.backend.domain;
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
    private String title;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "profile_img")
    private String profile_img;

    @Column(name = "context")
    private String context;

    @Column(name = "type")
    private String type;

    @Column(name = "year")
    private Integer year;

    @Column(name = "month" )
    private Integer month;

    @Column(name="chapter_id")
    @Type(type = "int-array")
    private Integer[] chapter_id;
}