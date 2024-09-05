package com.heros_shop.heros_shop_api.dto.enums;

public enum PaymentMethodDTO {
    CARD(0),
    BANK_SLIP(1),
    PIX(2);

    private int id;

    PaymentMethodDTO(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
