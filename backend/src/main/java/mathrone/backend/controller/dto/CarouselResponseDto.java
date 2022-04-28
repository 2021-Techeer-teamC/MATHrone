package mathrone.backend.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mathrone.backend.domain.WorkBookInfo;

import javax.persistence.Column;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
//@Builder(builderMethodName = "CarouselResponseDtoBuilder")
public class CarouselResponseDto {

    @Column(name = "workbook_id")
    private String workbookId;

    private short year;

    private String img;

    private String category;

    private String intro;

}
