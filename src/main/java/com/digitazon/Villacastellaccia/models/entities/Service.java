package com.digitazon.Villacastellaccia.models.entities;

import javax.persistence.*;

@Entity
@Table(name = "services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "service_generator")
    @SequenceGenerator(name = "service_generator", sequenceName = "services_id_seq",
            allocationSize = 1)
    private int id;
    private String name;
    private double price;
    private double discount;

    public Service() {
    }

    public Service(int id, String name, double price, double discount) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.discount = discount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }
}
