package com.team4.healthcare.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.team4.healthcare.dto.Appointment;

@Mapper
public interface AppointmentDao {
	public List<Appointment> selectAppointmentList();
	public int updateAppointmentState(@Param("appointment_id") int appointment_id, @Param("appointment_state") String appointment_state);
	public Appointment selectAppointmentById(int appointment_id);
	public List<Appointment> selectAppointmentListByState(String appointment_state);
	public List<Appointment> selectAppointmentHistory(int patient_id);
	public List<String> selectAppointment(@Param("staff_id") String staff_id, @Param("appointment_date") String appointment_date);
	public int insertNewAppointment(Appointment appointment);
	public Appointment selectTestAppointmentById(int appointment_id);
	public List<Appointment> selectCountByAppointment(String appointment_date);
}
