package mathrone.backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class controller {

    @GetMapping("hello")
    public List<String> hello(){
        return Arrays.asList("하이", "hello");
    }
}
