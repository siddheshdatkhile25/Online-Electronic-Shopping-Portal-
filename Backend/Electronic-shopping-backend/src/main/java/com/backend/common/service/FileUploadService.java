package com.backend.common.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
	
	String uploadFile(MultipartFile file,String folder) ;

	void deleteFile(String fileUrl);
}
