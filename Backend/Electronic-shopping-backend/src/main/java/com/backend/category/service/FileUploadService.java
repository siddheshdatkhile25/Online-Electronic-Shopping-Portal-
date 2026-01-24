package com.backend.category.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
	
	String uploadFile(MultipartFile file) throws IOException;
}
