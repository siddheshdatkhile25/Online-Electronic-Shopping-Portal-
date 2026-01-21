package com.backend.category.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Service
public class FileUploadServiceImpl implements FileUploadService{
	
	private final S3Client s3Client;
	
	
	public FileUploadServiceImpl(S3Client s3Client) {
	
		this.s3Client = s3Client;
	}

	@Value("${aws.bucket.name}")
	private String bucketName;
	
	@Override
	public String uploadFile(MultipartFile file) throws  IOException {
		String folder="categories";
		String key=folder+"/"+UUID.randomUUID()+"_"+file.getOriginalFilename();
		PutObjectRequest request=PutObjectRequest.builder()
				.bucket(bucketName)
				.key(key)
				.contentType(file.getContentType())
				.acl("public-read")
				.build();
		
		//upload file 
		//reads file as a stream
		s3Client.putObject(request, RequestBody.fromBytes(file.getBytes()));
		return "https://"+bucketName+ ".s3.ap-south-1.amazonaws.com/" + key;
		//generated public url
		//for eg. https://electronics-category-images.s3.ap-south-1.amazonaws.com/categories/abc123_tv.png

		
	}

}
