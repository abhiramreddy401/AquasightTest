package com.aquasight.model;

import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
@Table(name = "water")
public class WaterDao {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private double flow;
	@Column
	private double pressure;
	@Column
	private LocalDateTime entryTimeStamp;
	@Column
	private String userId;

	

	public double getFlow() {
		return flow;
	}

	public void setFlow(double flow) {
		this.flow = flow;
	}

	public double getPressure() {
		return pressure;
	}

	public void setPressure(double pressure) {
		this.pressure = pressure;
	}
	public LocalDateTime getEntryTimeStamp() {
		return entryTimeStamp;
	}

	public void setEntryTimeStamp(LocalDateTime entryTimeStamp) {
		this.entryTimeStamp = entryTimeStamp;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}

