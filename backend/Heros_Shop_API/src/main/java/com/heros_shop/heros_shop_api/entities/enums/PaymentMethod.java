package com.heros_shop.heros_shop_api.entities.enums;

public enum PaymentMethod {
    CARD(0),
    BANK_SLIP(1),
    PIX(2);

    private int id;

    PaymentMethod(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
