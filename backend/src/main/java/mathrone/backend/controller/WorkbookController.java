package mathrone.backend.controller;

import com.google.api.gax.paging.Page;
import jnr.ffi.annotations.In;
import mathrone.backend.domain.Problem;
import mathrone.backend.domain.PubCatPair;
import mathrone.backend.domain.WorkBookInfo;
import mathrone.backend.domain.bookItem;
import mathrone.backend.service.WorkBookServiceImpl;
import org.apache.commons.lang3.tuple.Pair;
import org.hibernate.criterion.Order;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.*;

@RestController
public class WorkbookController {


    private final WorkBookServiceImpl workBookService;

    public WorkbookController(WorkBookServiceImpl workBookService){
        this.workBookService = workBookService;
    }


    @GetMapping("/workbook/books") // 모든 워크북 조회(Books page)
    public Integer bookList(@RequestParam(value="publisher", required = false, defaultValue = "all") String publisher,
                                      @RequestParam(value="sortType", required = false, defaultValue = "star") String sortType,
                                      @RequestParam(value="category", required = false, defaultValue = "all") String category,
                                       @RequestParam(value="pageNum", required = false, defaultValue = "1") Integer pageNum
                                       ){

        //1. 결과로 반환할 bookItem 리스트 (임시)
        List<bookItem> result = new ArrayList<bookItem>();

        //파라미터 기반으로 결과 탐색
//        Page<WorkBookInfo> res = workBookService.findWorkbook(publisher,category,pageNum);


        //결과에 level,like을 attach하여 리스트로 생성
//        for (WorkBookInfo wb: res) {
//            String level = workBookService.getLevel(wb.getWorkbookId());
//            Long star = workBookService.getStar(wb.getWorkbookId());
//            bookItem b = new bookItem(wb.getWorkbookId(), wb.getTitle(), wb.getPublisher(), wb.getProfileImg(),level, star);
//            result.add(b);
//        }
//
//        //정렬 반영
//        if(sortType.equals("star")){//좋아요 높은 순
//            Collections.sort(result, new Comparator<bookItem>() {
//                public int compare(bookItem o1, bookItem o2) {
//                    return o2.getStar().compareTo(o1.getStar());
//                }
//            });
//        }
//        else{//level 난이도 높은 순
//            Collections.sort(result, new Comparator<bookItem>() {
//                public int compare(bookItem o1, bookItem o2) {
//                    return o2.getLevel().compareTo(o1.getLevel());
//                }
//            });
//        }

        return 1;
    }

    @GetMapping("/problems") // 모든 문제 조회(Books page)
    public List<Problem> problemList(@RequestParam(value="workbookId") String workbookId,
                                     @RequestParam(value="chapterId") String chapterId){
        return workBookService.findProblem(workbookId,chapterId);
    }

    @GetMapping("/workbook/info") // 모든 워크북 조회(Books page)
    public Long bookCount(@RequestParam(value="publisher", required = false, defaultValue = "all") String publisher,
                         @RequestParam(value="category", required = false, defaultValue = "all") String category)
    {
        //결과의 수 반환
        return workBookService.countWorkbook(publisher,category);
    }



    @GetMapping("workbook/list")
    public void workbookList(){
        //Nav bar
//        List<bookContent> contentList = new ArrayList<bookContent>();

        //group by 한 결과 받아오기
        List<PubCatPair> res = workBookService.getPublisherAndCategoryList();

        Collections.sort(res, Comparator.comparing(p -> p.getPublisher()));

        for (PubCatPair sample:res) {
            System.out.println(sample.getPublisher()+" "+sample.getCategory());
        }

        //Map을 이용해서 출판사, 카테고리 리스트 로 정렬 -> 리스트는 key find effective x
        HashMap<String,LinkedList<String>> navList = new HashMap<>();

        String pastPub="";
        LinkedList<String> valueList = new LinkedList<>();

//        Map< String, LinkedList<String> > listMap = new HashMap<>();


        int cnt=0;
        for (PubCatPair wb: res) {

            //출판사, 카테고리(1걔)
            String p = wb.getPublisher();
            String c = wb.getCategory();

            if(cnt==0){
                pastPub=p;
            }
            System.out.println("=========<<"+cnt+">>=========");
            System.out.println("past : "+ pastPub);
            System.out.println("now : " + p);
            System.out.println("category : " + c);

            if(pastPub.equals(p)){ //같은 것일때
                System.out.println("=======same : expand value list=====");
                System.out.println("category is "+c);
                valueList.add(c);
                System.out.println("value list is expended the lenght is : "+valueList.size());
                System.out.println("==================");

            }
            else{
                System.out.println("========diff : add it to the map =======");
                System.out.println("value list is now ... ");
                System.out.println(valueList);
                System.out.println("size is "+valueList.size());
                System.out.println("BEFORE : publisher is "+pastPub);
                navList.put(pastPub, new LinkedList<>(valueList));//value에 값 추가 -> 이렇게 안하면 벨류 바뀔때마다 바뀜;
                System.out.println("AFTER : publisher is "+pastPub);
                System.out.println("========PUTPUTPUTPUT111111==============");
                System.out.println(navList);
                System.out.println("=======================================");
                valueList.clear();
                System.out.println("========PUTPUTPUTPUT222222==============");
                System.out.println(navList);
                System.out.println("=======================================");
                valueList.add(c);
                System.out.println("========PUTPUTPUTPUT33333==============");
                System.out.println(navList);
                System.out.println("=======================================");
                pastPub=p;
                System.out.println("AFTER22 : publisher is "+pastPub);
                System.out.println("===============");
            }

            cnt++;

            System.out.println("=======================================");
            System.out.println(navList);
            System.out.println("=======================================");

        }
        navList.put(pastPub,valueList);//value에 값 추가

        navList.put("a",new LinkedList<String>(Arrays.asList("ab","cd","de")));
        navList.put("B",new LinkedList<String>(Arrays.asList("ab","cd","de")));

        System.out.println("EBS");
        System.out.println(navList.get("EBS"));
        System.out.println("평가원");
        System.out.println(navList.get("평가원"));
        System.out.println("교육청");
        System.out.println(navList.get("교육청"));
        //id를 위한 int 값
        int i=0;
        for (Map.Entry<String, LinkedList<String>> entry:navList.entrySet()) {//java map순회 방법
            String p = entry.getKey(); //publisher(key)
            LinkedList<String> c = entry.getValue();//publisher에 해당하는 categories
            System.out.println(p);
            System.out.println(c);
//            bookContent b = new bookContent(i++,p,c);
//            contentList.add(b);
        }





//        return res;
    }

}
