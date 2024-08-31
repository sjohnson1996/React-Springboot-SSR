package com.scott.accessor;

import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Source;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.nio.file.Files;
import java.nio.file.Paths;

@Component
public class GraalContextAccessor {

    private static final Logger log = LoggerFactory.getLogger(GraalContextAccessor.class);

    private Context context;

    // Initializes the GraalVM Context on service startup
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

            log.info("GraalVM context initialized successfully.");

        } catch (Exception e) {
            log.error("Failed to initialize GraalVM context", e);
        }
    }

    // Provides the initialized GraalVM context
    public Context getJavascriptContext() {
        return context;
    }
}
