package com.scott.controller;

import com.scott.accessor.GraalContextAccessor;
import com.scott.representation.Photo;
import com.scott.service.PhotoRetrievalService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.graalvm.polyglot.Source;
import org.graalvm.polyglot.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class SSRController {

    private static final Logger log = LoggerFactory.getLogger(SSRController.class);

    private final PhotoRetrievalService photoRetrievalService;
    private final GraalContextAccessor graalContextAccessor;
    private final ObjectMapper objectMapper;

    public SSRController(
            PhotoRetrievalService photoRetrievalService,
            GraalContextAccessor graalContextAccessor,
            ObjectMapper objectMapper
    ) {
        this.photoRetrievalService = photoRetrievalService;
        this.graalContextAccessor = graalContextAccessor;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/{path:(?!.*.js|.*.css|.*.jpg).*$}")
    public String renderPhotoGallery(Model model) {
        List<Photo> photos = photoRetrievalService.retrieveAllPhotos();

        try {
            String photosJson = objectMapper.writeValueAsString(photos);

            model.addAttribute("photos", photosJson);

            // JavaScript code to import the renderToString function and call it with the photos data
            String src = "import { renderPhotoGallery } from './src/main/resources/build/renderPhotoGallery.bundle.mjs';" +
                    "const result = renderPhotoGallery({ photos: " + photosJson + " }); result;";

            // Execute the JavaScript code and get the result using the shared context
            Value result = graalContextAccessor
                    .getJavascriptContext()
                    .eval(Source.newBuilder("js", src, "test.mjs").build());

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

        return "index";
    }
}
