package com.team4.healthcare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team4.healthcare.dao.TestDao;

@Service
public class TestService {
	@Autowired
	TestDao testDao;
	
	public int Test() {
		return testDao.test();
	}
}
