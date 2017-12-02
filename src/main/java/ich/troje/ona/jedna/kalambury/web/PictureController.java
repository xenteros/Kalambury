package ich.troje.ona.jedna.kalambury.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

@RestController
@RequestMapping("/api/pictures")
public class PictureController {

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping
    public String guess(@RequestBody int[] data) {
//        System.out.println(body);
        PictureData pictureData = new PictureData();
        pictureData.setArray(data);
        System.out.println(Arrays.stream(data).sum());
//        System.out.println(new Gson().toJson(pictureData));
        ResponseEntity<String> responseEntity = restTemplate.postForEntity("http://localhost:5000/predict", pictureData, String.class);
        return responseEntity.getBody();
    }

    @GetMapping
    public String integrate() {
        ResponseEntity<String> responseEntity = restTemplate.getForEntity("http://localhost:5000/predict", String.class);
        return responseEntity.getBody();
    }
}
