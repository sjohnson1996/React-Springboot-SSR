package com.djh.service;

import com.djh.representation.Photo;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class PhotoRetrievalService {

    private final RestTemplate restTemplate;

    public PhotoRetrievalService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Photo> retrieveAllPhotos() {
        String url = "https://jsonplaceholder.typicode.com/photos";
        Photo[] photos = restTemplate.getForObject(url, Photo[].class);
        return Arrays.asList(photos);
    }
}
