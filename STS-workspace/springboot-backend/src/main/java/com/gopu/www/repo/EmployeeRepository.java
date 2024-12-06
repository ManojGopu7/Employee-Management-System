package com.gopu.www.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gopu.www.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
