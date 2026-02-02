package com.backend.AdminAnalytics.DTO;

import java.math.BigDecimal;

public class CategorySalesDTO {

    private String categoryName;
    private Long totalQuantity;
    private BigDecimal totalRevenue;

  
    public CategorySalesDTO(String categoryName,
                            Long totalQuantity,
                            BigDecimal totalRevenue) {
        this.categoryName = categoryName;
        this.totalQuantity = totalQuantity;
        this.totalRevenue = totalRevenue;
    }

    
    public String getCategoryName() {
        return categoryName;
    }

    public Long getTotalQuantity() {
        return totalQuantity;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }
}
