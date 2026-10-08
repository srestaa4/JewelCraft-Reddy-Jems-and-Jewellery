package com.jewelcraft.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PriceCalculationResponse {
    private Double basePrice;
    private Double metalPrice;
    private Double diamondPrice;
    private Double customizationPrice;
    private Double estimatedPrice;
}
