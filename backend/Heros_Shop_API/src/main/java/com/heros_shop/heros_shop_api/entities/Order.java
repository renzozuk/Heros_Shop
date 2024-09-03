package com.heros_shop.heros_shop_api.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.heros_shop.heros_shop_api.entities.enums.PaymentMethod;
import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Entity(name = "order")
@Table(name = "order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;
    @Enumerated(EnumType.ORDINAL)
    private PaymentMethod paymentMethod;
    @Column(columnDefinition = "TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Etc/GMT0")
    private Date dateOfPurchase;
    @Column(columnDefinition = "TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Etc/GMT0")
    private Date dateOfDelivery;

    public Order() {
    }

    public Order(String id, User user, Product product, PaymentMethod paymentMethod, Date dateOfPurchase, Date dateOfDelivery) {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
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
        if (!(o instanceof Order order)) return false;
        return Objects.equals(id, order.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Order{" +
                "id='" + id + '\'' +
                ", user=" + user +
                ", product=" + product +
                ", paymentMethod=" + paymentMethod +
                ", dateOfPurchase=" + dateOfPurchase +
                ", dateOfDelivery=" + dateOfDelivery +
                '}';
    }
}
