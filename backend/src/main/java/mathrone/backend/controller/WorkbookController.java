package mathrone.backend.controller;

import com.google.api.gax.paging.Page;
import jnr.ffi.annotations.In;
import mathrone.backend.domain.*;
import mathrone.backend.service.WorkBookServiceImpl;
import org.apache.commons.lang3.tuple.Pair;
import org.hibernate.criterion.Order;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;//자료형 때문에 오류였음.. awt.print.Pageable아님
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;



import java.util.*;

@RestController
public class WorkbookController {


    private final WorkBookServiceImpl workBookService;

    public WorkbookController(WorkBookServiceImpl workBookService){
        this.workBookService = workBookService;
    }


    //workbook API
    @GetMapping("/workbook") // 모든 워크북 조회(Books page)
    public List<bookItem> bookList(@RequestParam(value="publisher", required = false, defaultValue = "all") String publisher,
                                   @RequestParam(value="sortType", required = false, defaultValue = "star") String sortType,
                                   @RequestParam(value="category", required = false, defaultValue = "all") String category,
                                   @RequestParam(value="pageNum", required = false, defaultValue = "1") Integer pageNum){

        Pageable paging = PageRequest.of(pageNum-1,9,Sort.by("workbookId")); //page 0부터임!

        //1. 결과로 반환할 bookItem 리스트 (임시)
        List<bookItem> result = new ArrayList<bookItem>();

        //파라미터 기반으로 결과 탐색
        List<WorkBookInfo> res = workBookService.findWorkbook(publisher,category,paging);

        //결과에 level,like을 attach하여 리스트로 생성
        for (WorkBookInfo wb: res) {
            String level = workBookService.getLevel(wb.getWorkbookId());
            Long star = workBookService.getStar(wb.getWorkbookId());
            bookItem b = new bookItem(wb.getWorkbookId(), wb.getTitle(), wb.getPublisher(), wb.getProfileImg(),level, star);
            result.add(b);
        }

        //정렬 반영
        if(sortType.equals("star")){//좋아요 높은 순
            Collections.sort(result, new Comparator<bookItem>() {
                public int compare(bookItem o1, bookItem o2) {
                    return o2.getStar().compareTo(o1.getStar());
                }
            });
        }
        else{//level 난이도 높은 순
            Collections.sort(result, new Comparator<bookItem>() {
                public int compare(bookItem o1, bookItem o2) {
                    return o2.getLevel().compareTo(o1.getLevel());
                }
            });
        }

        return result;
    }


    @GetMapping("/workbook/info") // 모든 워크북 조회(Books page)
    public Long bookCount(@RequestParam(value="publisher", required = false, defaultValue = "all") String publisher,
                         @RequestParam(value="category", required = false, defaultValue = "all") String category)
    {
        //결과의 수 반환
        return workBookService.countWorkbook(publisher,category);
    }



    @GetMapping("workbook/list")
    public List<bookContent> workbookList(){
        //Nav bar
        List<bookContent> contentList = new ArrayList<bookContent>(); //output

        //group by 한 결과 받아오기
        List<PubCatPair> res = workBookService.getPublisherAndCategoryList();

        //정렬 (출판사 순으로 정렬->같은 출판사끼리 모으기, 가나 2가지 기능)
        Collections.sort(res, Comparator.comparing(p -> p.getPublisher()));

        //Map을 이용해서 출판사, 카테고리 리스트 로 정렬 -> 리스트는 key find effective x
        HashMap<String,LinkedList<String>> navList = new HashMap<>();

        String pastPub="";
        LinkedList<String> valueList = new LinkedList<>();//카테고리 리스트



        int cnt=0;
        for (PubCatPair wb: res) {

            //출판사, 카테고리(1걔)
            String p = wb.getPublisher();
            String c = wb.getCategory();

            if(cnt==0){
                pastPub=p;
            }

            if(pastPub.equals(p)){ //같은 것일때
                valueList.add(c);
            }
            else{
                navList.put(pastPub, new LinkedList<>(valueList));//value에 값 추가 -> new로 새 객체에 담지 않으면 value 바뀔때마다 map값도 바뀜;
                valueList.clear();//재활용
                valueList.add(c);//이번턴 category
                pastPub=p;
            }
            cnt++;

        }
        navList.put(pastPub,valueList);//value에 값 추가

        //id를 위한 int 값
        long i=0;
        for (Map.Entry<String, LinkedList<String>> entry:navList.entrySet()) {//java map순회 방법
            String p = entry.getKey(); //publisher(key)
            LinkedList<String> c = entry.getValue();//publisher에 해당하는 categories
            bookContent b = new bookContent(i++,p,c);//new bookContents
            contentList.add(b);//add output list
        }

        return contentList;
    }


    //problem API
    @GetMapping("/problems") // 모든 문제 조회(Books page)
    public List<Problem> problemList(@RequestParam(value="workbookId") String workbookId,
                                     @RequestParam(value="chapterId") String chapterId){
        return workBookService.findProblem(workbookId,chapterId);
    }


}
