package com.jewelcraft.dto;

import lombok.Data;

@Data
public class PriceCalculationRequest {
    private String jewelleryType;
    private String designId;
    private Double basePrice;
    private String metalId;
    private Double metalPricePerGram;
    private String diamondId;
    private Double diamondPrice;
    private String engraving;
}
