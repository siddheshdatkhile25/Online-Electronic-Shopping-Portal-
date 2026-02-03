package com.backend.AdminAnalytics.Service;

import java.util.List;

import com.backend.AdminAnalytics.DTO.CategorySalesDTO;
import com.backend.AdminAnalytics.DTO.MonthlyRevenueDTO;

public interface AdminAnalyticsService {
	
	List<CategorySalesDTO> getCategoryWiseSales();

	List<MonthlyRevenueDTO> getMonthlyRevenue();

}
