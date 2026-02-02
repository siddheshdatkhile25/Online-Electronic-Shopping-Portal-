package com.backend.AdminAnalytics.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.AdminAnalytics.DTO.CategorySalesDTO;
import com.backend.AdminAnalytics.DTO.MonthlyRevenueDTO;
import com.backend.AdminAnalytics.Service.AdminAnalyticsService;
import com.backend.category.service.CategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/analytics")
@RequiredArgsConstructor
public class AdminAnalyticsController {

    private final AdminAnalyticsService adminAnalyticsService;
    private final CategoryService categoryService;
    
    @GetMapping("/sales")
    public List<CategorySalesDTO> getCategoryWiseSales() {
        return adminAnalyticsService.getCategoryWiseSales();
    }
 // Monthly revenue
    @GetMapping("/monthly-revenue")
    public List<MonthlyRevenueDTO> getMonthlyRevenue() {
        return adminAnalyticsService.getMonthlyRevenue();
    }

   
}
