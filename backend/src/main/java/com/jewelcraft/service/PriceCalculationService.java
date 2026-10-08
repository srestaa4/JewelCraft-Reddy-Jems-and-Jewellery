package com.jewelcraft.service;

import com.jewelcraft.dto.PriceCalculationRequest;
import com.jewelcraft.dto.PriceCalculationResponse;
import org.springframework.stereotype.Service;

@Service
public class PriceCalculationService {

    public PriceCalculationResponse calculatePrice(PriceCalculationRequest request) {
        // Base mounting price
        double basePrice = request.getBasePrice() != null ? request.getBasePrice() : 25000.0;

        // Estimated precious metal weight in grams
        double weight = getEstimatedMetalWeight(request.getJewelleryType());
        double metalPrice = weight * (request.getMetalPricePerGram() != null ? request.getMetalPricePerGram() : 5600.0);

        // Diamond valuation based on shape, carat, and clarity
        double diamondPrice = request.getDiamondPrice() != null ? request.getDiamondPrice() : 32000.0;

        // Customization fee (Laser engraving + mounting)
        double customizationPrice = 2000.0;
        if (request.getEngraving() != null && !request.getEngraving().trim().isEmpty()) {
            customizationPrice += 1500.0;
        }

        double estimatedPrice = basePrice + metalPrice + diamondPrice + customizationPrice;

        return PriceCalculationResponse.builder()
                .basePrice(basePrice)
                .metalPrice(metalPrice)
                .diamondPrice(diamondPrice)
                .customizationPrice(customizationPrice)
                .estimatedPrice(estimatedPrice)
                .build();
    }

    private double getEstimatedMetalWeight(String type) {
        if (type == null) return 5.0;
        switch (type.toLowerCase()) {
            case "ring": return 4.5;
            case "necklace": return 24.0;
            case "earrings": return 8.0;
            case "bracelet": return 16.0;
            case "pendant": return 3.5;
            default: return 5.0;
        }
    }
}
