package com.digitazon.Villacastellaccia.models.repositories;

import com.digitazon.Villacastellaccia.models.entities.Profile;
import com.digitazon.Villacastellaccia.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {
    List<Profile> findProfileByPlanner(User user);
    List<Profile> findProfileByUser(User user);
}
