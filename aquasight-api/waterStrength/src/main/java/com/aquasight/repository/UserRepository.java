package com.aquasight.repository;
import com.aquasight.model.UserDao;
import org.springframework.data.repository.CrudRepository;
public interface UserRepository extends CrudRepository<UserDao, Integer> {
    UserDao findByEmail(String email);
}