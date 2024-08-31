package com.djh;

import com.djh.postcode.Postcode;
import com.djh.postcode.PostcodeService;
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

    private final PostcodeService postcodeService;
    private final ObjectMapper objectMapper;

    public SSRController(PostcodeService postcodeService, ObjectMapper objectMapper) {
        this.postcodeService = postcodeService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/{path:(?!.*.js|.*.css|.*.jpg).*$}")
    public String render(Model model, HttpServletRequest request) {
        try {
            String polyfillsSrc = Files.readString(Paths.get("./src/main/resources/webEncodingPolyfill.bundle.mjs"));

            // JavaScript code to import the renderToString function and call it
            String src = "import { renderToString } from './src/main/resources/foo.bundle.mjs';" +
                    "const result = renderToString(); result;"; // Capture the result

            // Create a GraalVM context allowing IO operations
            try (Context cx = Context.newBuilder("js")
                    .allowIO(true)
                    .allowAllAccess(true) // Allow access to all host classes (if needed)
                    .build()) {

                // Evaluate the polyfills script first to set up the environment
                cx.eval(Source.newBuilder("js", polyfillsSrc, "polyfills.js").build());

                // Execute the JavaScript code and get the result
                Value result = cx.eval(Source.newBuilder("js", src, "test.mjs").build());

                // Check if the result is a string and add it to the model
                if (result.isString()) {
                    String renderedHtml = result.asString();
                    model.addAttribute("renderedHtml", renderedHtml);
                } else {
                    log.error("Expected a string result, but got: {}", result);
                }
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
