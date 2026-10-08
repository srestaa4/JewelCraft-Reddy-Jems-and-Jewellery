package com.jewelcraft.controller;

import com.jewelcraft.dto.PriceCalculationRequest;
import com.jewelcraft.dto.PriceCalculationResponse;
import com.jewelcraft.service.PriceCalculationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customizations")
@CrossOrigin(origins = "*")
public class CustomizationController {

    @Autowired
    private PriceCalculationService priceCalculationService;

    @PostMapping("/calculate-price")
    public ResponseEntity<PriceCalculationResponse> calculatePrice(@RequestBody PriceCalculationRequest request) {
        PriceCalculationResponse response = priceCalculationService.calculatePrice(request);
        return ResponseEntity.ok(response);
    }
}
