package mathrone.backend.domain;

import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Table(name = "workbook_star")
public class StarInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //JPA 사용시 필요
    @Column(name = "workbook_id")
    private String workbookId;

    @Column(name = "user_id")
    private Integer userId;


    public String getWorkbookId() {
        return workbookId;
    }

    public Integer getUserId() {
        return userId;
    }
}
