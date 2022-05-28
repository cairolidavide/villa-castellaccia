package com.digitazon.Villacastellaccia.models.services.abstractions;

import com.digitazon.Villacastellaccia.models.entities.Service;
import com.digitazon.Villacastellaccia.models.exceptions.ServiceNotFoundException;

import java.util.List;

public interface ServiceService {
    List<Service> findAllService();
    Service modifyServicePriceAndDiscount(Service service) throws ServiceNotFoundException;
}
