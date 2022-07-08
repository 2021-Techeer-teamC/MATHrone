package mathrone.backend.service;

import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mathrone.backend.controller.dto.ProblemGradeRequestDto;
import mathrone.backend.controller.dto.ProblemGradeResponseDto;
import mathrone.backend.domain.Solution;
import mathrone.backend.repository.SolutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private final SolutionRepository solutionRepository;

    @Transactional
    public List<ProblemGradeResponseDto> gradeProblem(
        ProblemGradeRequestDto problemGradeRequestDtoList) {
        List<ProblemGradeResponseDto> problemGradeResponseDtoList = new ArrayList<>();
        List<ProblemGradeRequestDto.problemSolve> list = problemGradeRequestDtoList.getAnswerSubmitList();
        for (ProblemGradeRequestDto.problemSolve problem : list) {
            Solution solutionProblem = solutionRepository.findSolutionByProblemId(
                problem.getProblemId());
            boolean isCorrect = false;
            if (solutionProblem.getAnswer() == problem.getSolution()) {
                isCorrect = true;
            }
            problemGradeResponseDtoList.add(ProblemGradeResponseDto.builder()
                .problemId(problem.getProblemId())
                .solution(problem.getSolution())
                .answer(isCorrect).build());
        }
        return problemGradeResponseDtoList;
    }


}
