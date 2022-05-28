package com.digitazon.Villacastellaccia.models.services.implementations;

import com.digitazon.Villacastellaccia.models.exceptions.ServiceNotFoundException;
import com.digitazon.Villacastellaccia.models.repositories.ServiceRepository;
import com.digitazon.Villacastellaccia.models.services.abstractions.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceServiceJpa implements ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public List<com.digitazon.Villacastellaccia.models.entities.Service> findAllService() {
        return serviceRepository.findAllByOrderByIdAsc();
    }

    @Override
    public com.digitazon.Villacastellaccia.models.entities.Service
    modifyServicePriceAndDiscount(com.digitazon.Villacastellaccia.models.entities.Service service)
            throws ServiceNotFoundException {
        Optional<com.digitazon.Villacastellaccia.models.entities.Service> foundedService =
                serviceRepository.findById(service.getId());
        if (foundedService.isPresent()) {
            serviceRepository.save(service);
            return service;
        } else {
            throw new ServiceNotFoundException("Il servizio con id " + service.getId()
                    + " non esiste quindi non può essere modificato");
        }
    }
}
