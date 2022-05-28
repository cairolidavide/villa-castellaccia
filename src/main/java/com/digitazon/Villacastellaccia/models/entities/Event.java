package com.digitazon.Villacastellaccia.models.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "event_generator")
    @SequenceGenerator(name = "event_generator", sequenceName = "events_id_seq",
            allocationSize = 1)
    private int id;
    private String title;
    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;
    private LocalDateTime date;
    private int price;

    public Event() {
    }

    public Event(int id, String title, Profile profile, LocalDateTime date, int price) {
        this.id = id;
        this.title = title;
        this.profile = profile;
        this.date = date;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Profile getProfile() {
        return profile;
    }

}
