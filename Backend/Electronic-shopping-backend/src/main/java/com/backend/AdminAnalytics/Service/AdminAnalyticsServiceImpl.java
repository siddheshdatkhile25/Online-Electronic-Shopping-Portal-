package com.backend.AdminAnalytics.Service;


	import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.AdminAnalytics.DTO.CategorySalesDTO;
import com.backend.AdminAnalytics.DTO.MonthlyRevenueDTO;
import com.backend.category.repository.CategoryRepository;
import com.backend.order.Repository.OrderItemRepository;

import lombok.RequiredArgsConstructor;
	
	

	@Service
	@RequiredArgsConstructor
	public class AdminAnalyticsServiceImpl implements AdminAnalyticsService {
		
		
		 private final CategoryRepository categoryRepository;
		    private final OrderItemRepository orderItemRepository;

		    @Override
		    public List<CategorySalesDTO> getCategoryWiseSales() {
		        return categoryRepository.getCategoryWiseSales();
		    }

		    @Override
		    public List<MonthlyRevenueDTO> getMonthlyRevenue() {
		        return orderItemRepository.getMonthlyRevenue();
		    }
	}

