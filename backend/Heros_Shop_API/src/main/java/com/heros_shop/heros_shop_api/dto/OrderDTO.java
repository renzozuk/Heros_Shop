package com.heros_shop.heros_shop_api.dto;

import com.heros_shop.heros_shop_api.dto.enums.PaymentMethodDTO;

import java.util.Date;
import java.util.Objects;

public class OrderDTO {
    private String id;
    private UserDTO user;
    private ProductDTO product;
    private PaymentMethodDTO paymentMethod;
    private Date dateOfPurchase;
    private Date dateOfDelivery;

    public OrderDTO() {
    }

    public OrderDTO(String id, UserDTO user, ProductDTO product, PaymentMethodDTO paymentMethod, Date dateOfPurchase, Date dateOfDelivery) {
        this.id = id;
        this.user = user;
        this.product = product;
        this.paymentMethod = paymentMethod;
        this.dateOfPurchase = dateOfPurchase;
        this.dateOfDelivery = dateOfDelivery;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public PaymentMethodDTO getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethodDTO paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Date getDateOfPurchase() {
        return dateOfPurchase;
    }

    public void setDateOfPurchase(Date dateOfPurchase) {
        this.dateOfPurchase = dateOfPurchase;
    }

    public Date getDateOfDelivery() {
        return dateOfDelivery;
    }

    public void setDateOfDelivery(Date dateOfDelivery) {
        this.dateOfDelivery = dateOfDelivery;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderDTO orderDTO)) return false;
        return Objects.equals(id, orderDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "OrderDTO{" +
                "id='" + id + '\'' +
                ", user=" + user +
                ", product=" + product +
                ", paymentMethod=" + paymentMethod +
                ", dateOfPurchase=" + dateOfPurchase +
                ", dateOfDelivery=" + dateOfDelivery +
                '}';
    }
}
