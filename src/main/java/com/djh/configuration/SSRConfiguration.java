package com.djh.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.script.ScriptTemplateConfigurer;
import org.springframework.web.servlet.view.script.ScriptTemplateViewResolver;

import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

/**
 * @author David Hancock
 */
@Configuration
public class SSRConfiguration {

    @Bean
    public ViewResolver reactViewResolver() {
        ScriptTemplateViewResolver resolver = new ScriptTemplateViewResolver();
        resolver.setPrefix("classpath:/templates/"); // Correctly points to resources/templates
        resolver.setSuffix(".html");
        resolver.setOrder(1);
        return resolver;
    }

//    @Bean
//    public ScriptTemplateConfigurer templateConfigurer() {
//        ScriptTemplateConfigurer configurer = new ScriptTemplateConfigurer();
//
//        // Set the GraalVM JavaScript engine
//        configurer.setEngineName("graal.js");
//
//        // Point to the correct server-side script
//        configurer.setScripts("classpath:server.js"); // Make sure this is the correct location
//
//        configurer.setRenderFunction("render");
//        configurer.setSharedEngine(false);
//        return configurer;
//    }


    @Bean
    public ScriptTemplateConfigurer templateConfigurer() {
        ScriptTemplateConfigurer configurer = new ScriptTemplateConfigurer();

        // Obtain the GraalVM JavaScript engine with appropriate settings
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine graalEngine = manager.getEngineByName("graal.js");

        // Set options to allow Java access
        graalEngine.getContext().getBindings(ScriptContext.ENGINE_SCOPE).put("polyglot.js.allowAllAccess", true);
        graalEngine.getContext().getBindings(ScriptContext.ENGINE_SCOPE).put("polyglot.js.allowHostAccess", true);

        // Use the configured engine in ScriptTemplateConfigurer
        configurer.setEngine(graalEngine);
        configurer.setScripts("classpath:server.js"); // Correctly points to the script location
        configurer.setRenderFunction("render");
//        configurer.setSharedEngine(false);

        return configurer;
    }
}
