package com.djh;

import com.djh.postcode.Postcode;
import com.djh.postcode.PostcodeService;
import com.djh.representation.Photo;
import com.djh.service.PhotoRetrievalService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Source;
import org.graalvm.polyglot.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author David Hancock
 */
@Controller
public class SSRController {

    private static final Logger log = LoggerFactory.getLogger(SSRController.class);

    private final PhotoRetrievalService photoRetrievalService;
    private final PostcodeService postcodeService;
    private final ObjectMapper objectMapper;

    // Shared Context for GraalVM
    private Context context;

    public SSRController(PhotoRetrievalService photoRetrievalService, PostcodeService postcodeService, ObjectMapper objectMapper) {
        this.photoRetrievalService = photoRetrievalService;
        this.postcodeService = postcodeService;
        this.objectMapper = objectMapper;
    }

    // Initialize the Context and load polyfills when the controller is created
    @PostConstruct
    public void initializeContext() {
        try {
            // Initialize the GraalVM context with desired options
            context = Context.newBuilder("js")
                    .allowIO(true)
                    .allowAllAccess(true) // Allow access to all host classes (if needed)
                    .build();

            // Load and evaluate the polyfills script once
            String polyfillsSrc = Files.readString(Paths.get("./src/main/resources/build/webEncodingPolyfill.bundle.mjs"));
            context.eval(Source.newBuilder("js", polyfillsSrc, "polyfills.js").build());
        } catch (Exception e) {
            log.error("Failed to initialize GraalVM context", e);
        }
    }

    @GetMapping("/{path:(?!.*.js|.*.css|.*.jpg).*$}")
    public String renderPhotoGallery(Model model, HttpServletRequest request) {
        List<Photo> photos = photoRetrievalService.retrieveAllPhotos();

        try {
            // Convert the list of photos to JSON
            ObjectMapper objectMapper = new ObjectMapper();
            String photosJson = objectMapper.writeValueAsString(photos);

            model.addAttribute("photos", photosJson);

            // JavaScript code to import the renderToString function and call it with the photos data
            String src = "import { renderPhotoGallery } from './src/main/resources/build/renderPhotoGallery.bundle.mjs';" +
                    "const result = renderPhotoGallery({ photos: " + photosJson + " }); result;";

            // Execute the JavaScript code and get the result using the shared context
            Value result = context.eval(Source.newBuilder("js", src, "test.mjs").build());

            // Check if the result is a string and add it to the model
            if (result.isString()) {
                String renderedHtml = result.asString();
                model.addAttribute("renderedHtml", renderedHtml);
            } else {
                log.error("Expected a string result, but got: {}", result);
            }
        } catch (Exception e) {
            log.error("Error executing script", e);
        }

        addCurrentPath(model, request);
        addServerSideContent(model);
        model.addAttribute("title", "Server Side Rendered React Application");
        return "index";
    }

    private void addCurrentPath(Model model, HttpServletRequest request) {
        String path = request.getServletPath();
        if (request.getServletPath().equals("/index.html")) {
            path = "/";
        }

        if (request.getQueryString() != null) {
            path = String.format("%s?%s", path, request.getQueryString());
        }
        model.addAttribute("currentPath", path);
    }

    private void addServerSideContent(Model model) {
        String initialPostcodeQuery = "ST3";
        List<Postcode> postcodes = postcodeService.retrievePostcodesFor(initialPostcodeQuery);

        Map<String, Object> serverSideState = new HashMap<>();
        serverSideState.put("postcodeQuery", initialPostcodeQuery);
        serverSideState.put("postcodes", postcodes);
        try {
            model.addAttribute("serverSideState", objectMapper.writeValueAsString(serverSideState));
        } catch (JsonProcessingException e) {
            log.error("Failed to serialize image posts", e);
        }
    }
}
