package mathrone.backend.domain;

import com.sun.istack.NotNull;
import com.vladmihalcea.hibernate.type.array.IntArrayType;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;

@NoArgsConstructor
@Entity
public class bookItem {

    //bookItem에 필요한 attribute
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //JPA 사용시 필요
    private int workbookId;

    @NotNull
    private String title;

    @NotNull
    private String publisher;

    @NotNull
    private String profileImg;

    private Short level;
    private int like;

    //생성자
    public bookItem(int workbookId, String title, String publisher, String profileImg, Short level, int like){
        this.workbookId=workbookId;
        this.title=title;
        this.publisher=publisher;
        this.profileImg=profileImg;
        this.level=level;
        this.like=like;
    }

    //getter & setter
    public int getWorkbookId() {
        return workbookId;
    }

    public String getTitle() {
        return title;
    }

    public String getPublisher() {
        return publisher;
    }

    public String getProfileImg() {
        return profileImg;
    }

    public Short getLevel() {return level;}

    public int getLike() {return like;}


    public void setWorkbookId(int workbookId) {
        this.workbookId=workbookId;
    }

    public void setTitle(String title) {
        this.title=title;
    }

    public void setPublisher(String publisher) {
        this.publisher=publisher;
    }

    public void setProfileImg(String profileImg) {
        this.profileImg=profileImg;
    }

    public void setLevel(Short level) { this.level=level;}

    public void setLike(int like) { this.like=like;}

}
