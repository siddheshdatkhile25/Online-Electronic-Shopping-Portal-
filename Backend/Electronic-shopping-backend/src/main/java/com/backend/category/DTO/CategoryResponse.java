package com.backend.category.DTO;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {

	 private Long id;
	    private String name;
	    private String description;
	    private String imageUrl;
	    private LocalDateTime createdAt;
	    private LocalDateTime updatedAt;
}
