package com.team4.healthcare.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team4.healthcare.dao.AppointmentDao;
import com.team4.healthcare.dao.ReceptionDao;
import com.team4.healthcare.dao.StaffDao;
import com.team4.healthcare.dao.TestListDao;
import com.team4.healthcare.dto.Appointment;
import com.team4.healthcare.dto.Staff;

@Service
public class AppointmentService {
	private static final Logger logger = LoggerFactory.getLogger(AppointmentService.class);

	@Autowired
	AppointmentDao appointmentDao;
	@Autowired
	StaffDao staffDao;
	@Autowired
	TestListDao testListDao;
	@Autowired
	ReceptionDao receptionDao;
	
	
	public List<Appointment> getDoctorTreatmentApoointment(String staff_id,String appointment_date) {
		return appointmentDao.selectDoctorTreatmentAppointment(staff_id, appointment_date);
	}
	
	public Map<String,Object> getTreatmentAppointmentList(String appointment_date){
		List<Staff> staffs=staffDao.selectDoctorNameList();
		List <List<Appointment>> appointmentArr = new ArrayList<>();
		Map<String,Object> treatmentAppoint = new HashMap<>();
		for(Staff staff : staffs) {
			appointmentArr.add(getDoctorTreatmentApoointment(staff.getStaff_id(), appointment_date));
		}
		treatmentAppoint.put("staffs", staffs);
		treatmentAppoint.put("doctorAppointment", appointmentArr);	
		return treatmentAppoint;
	}
	
	
	public List<Appointment> getAppointmentList(String appointment_date){
		return appointmentDao.selectByDate(appointment_date);
	}
	
	public List<Appointment> getAppointmentListByPatientId(int patient_id){
		return appointmentDao.selectByPatientId(patient_id);
	}
	public void insertTreatmentAppointment(Appointment appointment) {
		appointmentDao.insertTreatmentAppointment(appointment);
	}
	
	//검사예약 취소
	public void cancelTreatmentAppointment(int appointment_id) {
		//예약 취소
		appointmentDao.cancelTreatmentAppointment(appointment_id);
		
	}

	public List<Appointment> getTestAppointmentByDate(String appointment_date, String appointment_time){
		return appointmentDao.selectTestAppointmentByDate(appointment_date, appointment_time);
	}
	
	public void insertTestAppointment(Appointment appointment) {
		appointmentDao.insertTestAppointment(appointment);
	}
	public int getMaxAppointmentId() {
		return appointmentDao.selectMaxAppointmentId();
	}
}
