package mathrone.backend.service;


import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import mathrone.backend.controller.dto.ProblemGradeRequestDto;
import mathrone.backend.controller.dto.ProblemGradeResponseDto;
import mathrone.backend.domain.Problem;
import mathrone.backend.domain.Solution;
import mathrone.backend.repository.ProblemRepository;
import mathrone.backend.repository.SolutionRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProblemServiceImpl implements ProblemService{
    private final ProblemRepository problemRepository;
    private final SolutionRepository solutionRepository;

    @Override
    public Problem findProblembyId(String problemId) {
        return problemRepository.findByProblemId(problemId);
    }

    @Override
    public List<Problem> findProblem(String workbookId, String chapterId){
        return problemRepository.findByWorkbookIdAndChapterId(workbookId, chapterId);
    }

    public List<ProblemGradeResponseDto> gradeProblem(ProblemGradeRequestDto problemGradeRequestDtoList) {
        List<ProblemGradeResponseDto> problemGradeResponseDtoList = new ArrayList<ProblemGradeResponseDto>();
        List<ProblemGradeRequestDto.problemSolve> list = problemGradeRequestDtoList.getProblemSolveList();
        for (ProblemGradeRequestDto.problemSolve problem : list){
            Solution solutionProblem = solutionRepository.findSolutionByProblemId(problem.getProblemId());
            boolean isCorrect = false;
            if (solutionProblem.getAnswer() == problem.getSolution())
                isCorrect = true;
            problemGradeResponseDtoList.add(ProblemGradeResponseDto.builder()
                .problemId(problem.getProblemId())
                .solution(problem.getSolution())
                .answer(isCorrect).build());
        }
        return problemGradeResponseDtoList;
    }
}
