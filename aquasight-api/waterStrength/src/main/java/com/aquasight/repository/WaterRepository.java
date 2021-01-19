package com.aquasight.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.aquasight.model.WaterDao;

public interface WaterRepository extends CrudRepository<WaterDao, Integer> {

	
	List<WaterDao> findByUserId(String userId);

	
}
