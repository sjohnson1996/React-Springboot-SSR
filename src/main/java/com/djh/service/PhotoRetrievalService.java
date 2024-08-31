package com.djh.service;

import com.djh.accessor.RestTemplateAccessor;
import com.djh.representation.Photo;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class PhotoRetrievalService {

    private final RestTemplateAccessor restTemplateAccessor;

    public PhotoRetrievalService(RestTemplateAccessor restTemplateAccessor) {
        this.restTemplateAccessor = restTemplateAccessor;
    }

    public List<Photo> retrieveAllPhotos() {
        String url = "https://jsonplaceholder.typicode.com/photos";
        Photo[] photos = restTemplateAccessor.getRestTemplate().getForObject(url, Photo[].class);
        return Arrays.asList(photos);
    }
}
