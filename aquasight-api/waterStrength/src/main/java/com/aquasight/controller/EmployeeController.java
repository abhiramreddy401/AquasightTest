package com.aquasight.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aquasight.model.WaterDao;
import com.aquasight.model.WaterDto;
import com.aquasight.service.WaterService;

@RestController
public class EmployeeController {
	
	@Autowired
	private WaterService waterService;
	
    @RequestMapping(value = "/greeting", method = RequestMethod.GET)
    public String getEmployees() {
        return "Welcome!";
    }
    
    @RequestMapping(value = "/saveFlow", method = RequestMethod.POST)
	public ResponseEntity<?> saveFlow(@RequestBody WaterDto water) throws Exception {
		return ResponseEntity.ok(waterService.save(water));
	}
    
    @RequestMapping(value = "/getFlow", method = RequestMethod.GET)
   	public List<WaterDao> getFlow(){
    	
    	return  waterService.findAll();
   	}
    
    @RequestMapping(value = "/getFlowByUserId", method = RequestMethod.GET)
   	public List<WaterDao> getFlow(@RequestParam String userId){
    	
    	return  waterService.findByUserId(userId);
   	}
}