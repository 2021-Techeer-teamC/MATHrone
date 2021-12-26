package mathrone.backend.domain;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor // 모든 필드 값을 받는 생성자를 만든다.
//@Entity
public class BookInfoDTO {

    //@Id @GeneratedValue(strategy = GenerationType.IDENTITY) //JPA 사용시 필요
    private int workbook_id;
    
    private String title;
    private String profile_img;
    private String publisher;
    private String level;
}
