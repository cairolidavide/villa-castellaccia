package com.digitazon.Villacastellaccia.models.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "visits")
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "visit_generator")
    @SequenceGenerator(name = "visit_generator", sequenceName = "visits_id_seq",
            allocationSize = 1)
    private int id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "planner_id")
    private User planner;
    private LocalDateTime date;

    public Visit() {
    }

    public Visit(int id, User user, User planner, LocalDateTime date) {
        this.id = id;
        this.user = user;
        this.planner = planner;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setPlanner(User planner) {
        this.planner = planner;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public User getPlanner() {
        return planner;
    }

    public User getUser() {
        return user;
    }

}
