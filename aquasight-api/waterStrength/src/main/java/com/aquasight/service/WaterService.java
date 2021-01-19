package com.aquasight.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aquasight.model.WaterDao;
import com.aquasight.model.WaterDto;
import com.aquasight.repository.WaterRepository;

@Service
public class WaterService {

	@Autowired
	private WaterRepository waterDao;
	
	public WaterDao save(WaterDto water) {
		WaterDao newWater = new WaterDao();
		newWater.setFlow(water.getFlow());
		newWater.setPressure(water.getPressure());
		newWater.setUserId(water.getUserId());
		
		LocalDateTime localDateTime = LocalDateTime.now();
		newWater.setEntryTimeStamp(localDateTime);
		return waterDao.save(newWater);
	}
	
	public List<WaterDao> findAll() {
		
		return (List<WaterDao>) waterDao.findAll();
	}
	
public List<WaterDao> findByUserId(String userId) {
		
		return (List<WaterDao>) waterDao.findByUserId(userId);
	}
}
