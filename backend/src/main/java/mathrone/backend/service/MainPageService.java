package mathrone.backend.service;

import mathrone.backend.controller.dto.RecentTryDto;
import mathrone.backend.domain.*;
import mathrone.backend.repository.ChapterRepository;
import mathrone.backend.repository.LevelRepository;
import mathrone.backend.repository.ProblemRepository;
import mathrone.backend.repository.UserWorkbookRelRepository;
import mathrone.backend.repository.WorkBookRepository;
import mathrone.backend.repository.WorkbookLevelRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MainPageService {
    private final UserWorkbookRelRepository workBookRelRepository;
    private final WorkBookRepository workBookRepository;
    private final WorkbookLevelRepository workbookLevelRepository;
    private final LevelRepository levelRepository;
    private final ProblemRepository problemRepository;
    private final ChapterRepository chapterRepository;

    public MainPageService(UserWorkbookRelRepository workBookRelRepository,
            WorkBookRepository workBookRepository, WorkbookLevelRepository workbookLevelRepository,
            LevelRepository levelRepository,
            ProblemRepository problemRepository,
            ChapterRepository chapterRepository) {
        this.workBookRelRepository = workBookRelRepository;
        this.workBookRepository = workBookRepository;
        this.workbookLevelRepository = workbookLevelRepository;
        this.levelRepository = levelRepository;
        this.problemRepository = problemRepository;
        this.chapterRepository = chapterRepository;
    }

    public List<userWorkbookData> getTryingBook(int userId){
        List<userWorkbookData> result = new ArrayList<userWorkbookData>();
        for(UserWorkbookRelInfo userWorkbookRelInfo: workBookRelRepository.findByUserIdAndWorkbookTry(userId)){
            WorkBookInfo workBookInfo = workBookRepository.findByWorkbookId(userWorkbookRelInfo.getWorkbookId());
//            WorkbookLevelInfo workbookLevelInfo = workbookLevelRepository.findByWorkbookId(workBookInfo.getWorkbookId());
//            int low = workbookLevelInfo.getLowCnt();
//            int mid = workbookLevelInfo.getMidCnt();
//            int high = workbookLevelInfo.getHighCnt();
//            String b;
//            if (low > mid){
//                if (low > high)
//                    b = "1";
//                else
//                    b = "3";
//            }
//            else {
//                if (mid > high)
//                    b = "2";
//                else
//                    b = "3";
//            }
            userWorkbookData a = new userWorkbookData(workBookInfo.getWorkbookId(), workBookInfo.getTitle(), workBookInfo.getProfileImg(), workBookInfo.getPublisher(), getLevel(workBookInfo.getWorkbookId()), userWorkbookRelInfo.getWorkbookStar());
            result.add(a);
        }
        return result;
    }


    public List<userWorkbookData> getStarBook(int userId){
        List<userWorkbookData> result = new ArrayList<userWorkbookData>();

        // userId를 기반으로 해당 user의 정보를 찾아오기
        List<UserWorkbookRelInfo> userWorkbook = workBookRelRepository.findByUserIdAndWorkbookStar(userId);

        List<WorkBookInfo> workbookList = new ArrayList<WorkBookInfo>();

        //별이 찍힌 문제집의 정보 리스트
        for(UserWorkbookRelInfo userWorkbookRelInfo: userWorkbook){
            WorkBookInfo w = workBookRepository.findByWorkbookId(userWorkbookRelInfo.getWorkbookId()); //해당 문제집의 정보를 가져옴
            workbookList.add(w);// 리스트에 저장
        }


        //원하는 정보만 남기기
        //workbookId,title,img,publisher,level,star
        for(WorkBookInfo wb: workbookList){
            String level = getLevel(wb.getWorkbookId());
            userWorkbookData b = new userWorkbookData(wb.getWorkbookId(), wb.getTitle(), wb.getPublisher(), wb.getProfileImg(),level, true); //이미 true인 값에 대해서만해서 항상 true
            result.add(b);
        }

        return result;
    }


    public String getLevel(String workbookId){
        //해당 문제집의 레벨투표 정보를 가져옴
        WorkbookLevelInfo wb = levelRepository.findByWorkbookId(workbookId);

        //각 난이도별 투표수
        int high = wb.getHighCnt();
        int mid = wb.getMidCnt();
        int low = wb.getLowCnt();

        //투표수중 최대값
        int maxValue = Math.max(high,Math.max(mid,low));

        if(maxValue==low) return "1";
        else if(maxValue==mid) return "2";
        else return "3";

    }

    public List<RecentTryDto> getRecentTry(){
        List<Problem> problemList = problemRepository.findByRecentTry(); // 최근 푼 10개 가져옴
        List<RecentTryDto> recentTryProblems = new ArrayList<RecentTryDto>();
        for(Problem problem: problemList){
            RecentTryDto recentTry = RecentTryDto.builder()
                    .problemId(problem.getProblemId())
                    .problemNum(problem.getProblemNum())
                    .workbookTitle(workBookRepository.findByWorkbookId(problem.getChapterId()).getTitle())
                    .level(problem.getLevelOfDiff())
                    .subject(chapterRepository.findByChapterId(problem.getChapterId()).get().getSubject())
                    .chapter(chapterRepository.findByChapterId(problem.getChapterId()).get().getChapter())
                    .build();
            recentTryProblems.add(recentTry);
        }
        return recentTryProblems;
    }
}
