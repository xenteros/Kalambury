package ich.troje.ona.jedna.kalambury.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/pictures")
public class PictureController {

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping
    public List<String> guess(@RequestBody PictureData body) {
        System.out.println(body);
        return Collections.emptyList();
    }

    @GetMapping
    public String integrate() {
        ResponseEntity<String> responseEntity = restTemplate.getForEntity("http://localhost:5000/predict", String.class);
        return responseEntity.getBody();
    }
}
