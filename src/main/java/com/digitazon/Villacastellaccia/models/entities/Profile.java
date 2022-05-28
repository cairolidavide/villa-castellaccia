package com.digitazon.Villacastellaccia.models.entities;

import javax.persistence.*;

@Entity
@Table(name = "profiles")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profile_generator")
    @SequenceGenerator(name = "profile_generator", sequenceName = "profiles_id_seq",
            allocationSize = 1)
    private int id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "planner_id")
    private User planner;
    private String catering;
    private int guests;
    private boolean evening;
    private boolean church;
    private String areas;
    private String rooms;
    private boolean preparation;
    private boolean fireworks;
    private String description;

    public Profile() {
    }

    public Profile(int id, User user, User planner, int guests, String catering, boolean evening, boolean church, String areas,
                   String rooms, boolean preparation, boolean fireworks, String description) {
        this.id = id;
        this.user = user;
        this.planner = planner;
        this.guests = guests;
        this.catering = catering;
        this.evening = evening;
        this.church = church;
        this.areas = areas;
        this.rooms = rooms;
        this.preparation = preparation;
        this.fireworks = fireworks;
        this.description = description;
    }

    public int getGuests() {
        return guests;
    }

    public void setGuests(int guests) {
        this.guests = guests;
    }

    public String getCatering() {
        return catering;
    }

    public void setCatering(String catering) {
        this.catering = catering;
    }

    public boolean isEvening() {
        return evening;
    }

    public void setEvening(boolean evening) {
        this.evening = evening;
    }

    public boolean isChurch() {
        return church;
    }

    public void setChurch(boolean church) {
        this.church = church;
    }

    public String getAreas() {
        return areas;
    }

    public void setAreas(String areas) {
        this.areas = areas;
    }

    public String getRooms() {
        return rooms;
    }

    public void setRooms(String rooms) {
        this.rooms = rooms;
    }

    public boolean isPreparation() {
        return preparation;
    }

    public void setPreparation(boolean preparation) {
        this.preparation = preparation;
    }

    public boolean isFireworks() {
        return fireworks;
    }

    public void setFireworks(boolean fireworks) {
        this.fireworks = fireworks;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getPlanner() {
        return planner;
    }

    public User getUser() {
        return user;
    }
}
