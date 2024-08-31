package com.scott.accessor;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class RestTemplateAccessor {
    private final RestTemplate restTemplate;

    public RestTemplateAccessor() {
        this.restTemplate = new RestTemplate();
    }

    public RestTemplate getRestTemplate() {
        return restTemplate;
    }
}
