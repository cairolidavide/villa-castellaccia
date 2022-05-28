package com.digitazon.Villacastellaccia.controllers;

import com.digitazon.Villacastellaccia.models.entities.Service;
import com.digitazon.Villacastellaccia.models.exceptions.ServiceNotFoundException;
import com.digitazon.Villacastellaccia.models.services.abstractions.ServiceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/services")
@CrossOrigin("*")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @GetMapping
    public ResponseEntity findAllService() {
        return ResponseEntity.ok(serviceService.findAllService());
    }

    @PutMapping
    public ResponseEntity modifyServicePriceAndDiscount(@RequestBody Service service) {
        try {
            Service savedService = serviceService.modifyServicePriceAndDiscount(service);
            return ResponseEntity.ok(savedService);
        } catch (ServiceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
