package com.team4.healthcare.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.team4.healthcare.controller.DashBoardController;
import com.team4.healthcare.dao.AccountDao;
import com.team4.healthcare.dto.Hospital;
import com.team4.healthcare.dto.Staff;

@Service
public class AccountService {
	private static final Logger logger = LoggerFactory.getLogger(AccountService.class);

	@Autowired
	AccountDao accountDao;
	
	public void createAccount(Staff staff) {
		
		if(staff.getStaff_pic() != null) {
			MultipartFile staff_attach_pic = staff.getStaff_pic();
			staff.setStaff_pic_oname(staff_attach_pic.getOriginalFilename());
			staff.setStaff_pic_sname(new Date().getTime() + "-" + staff_attach_pic.getOriginalFilename());
			staff.setStaff_pic_type(staff_attach_pic.getContentType());
			
			try {
				File file = new File("D:/healthcarepic/" + staff.getStaff_pic_sname());
				staff_attach_pic.transferTo(file);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		BCryptPasswordEncoder bpe = new BCryptPasswordEncoder();
		staff.setStaff_password(bpe.encode(staff.getStaff_password()));
			
		accountDao.insertStaff(staff);
	}
	
	public List<Staff> getStaffList(){
		return accountDao.selectAll();
	}
	
	public Staff getStaff(String staff_id) {
		return accountDao.selectOne(staff_id);
	}
	
	public void getStaffAttach(String staff_id, HttpServletResponse response) {
		try {
			Staff staff = accountDao.selectOne(staff_id);
			response.setContentType(staff.getStaff_pic_type());
		
			String staff_pic_oname = staff.getStaff_pic_oname();
			staff_pic_oname = new String(staff_pic_oname.getBytes("UTF-8"), "ISO-8859-1");
			response.setHeader("Content-Disposition", "inline; filename=\"" + staff_pic_oname + "\";");
	
			InputStream is = new FileInputStream("D:/healthcarepic/" + staff.getStaff_pic_sname());
			OutputStream os = response.getOutputStream();
			FileCopyUtils.copy(is, os);
			os.flush();
			is.close();
			os.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void updateAccount(Staff staff) {
		
		if(staff.getStaff_pic() != null) {
			MultipartFile staff_attach_pic = staff.getStaff_pic();
			staff.setStaff_pic_oname(staff_attach_pic.getOriginalFilename());
			staff.setStaff_pic_sname(new Date().getTime() + "-" + staff_attach_pic.getOriginalFilename());
			staff.setStaff_pic_type(staff_attach_pic.getContentType());
			
			try {
				File file = new File("D:/healthcarepic/" + staff.getStaff_pic_sname());
				staff_attach_pic.transferTo(file);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		System.out.println(staff.getStaff_password());
		
		if(!staff.getStaff_password().equals("null") && !staff.getStaff_password().equals("")) {
			BCryptPasswordEncoder bpe = new BCryptPasswordEncoder();
			staff.setStaff_password(bpe.encode(staff.getStaff_password()));
		}
		
		accountDao.updateStaff(staff);
	}
	
	public void deleteAccount(String staff_id) {
		accountDao.deleteStaff(staff_id);
	}
	
	public Hospital getHospital(String hospital_code) {
		return accountDao.getHospital(hospital_code);
	}
	
	public void updateHospital(Hospital hospital) {
		accountDao.updateHospital(hospital);
	}
	
	public Boolean checkDuplicateId(String staff_id) {
		int result = accountDao.checkDuplicateId(staff_id);
		if(result == 1) return false;
		else return true;
	}

}
