package com.heros_shop.heros_shop_api.dto;

import java.util.Date;
import java.util.Objects;

public class ReviewDTO {
    private String id;
    private OrderDTO order;
    private String comment;
    private int stars;
    private Date date;

    public ReviewDTO() {
    }

    public ReviewDTO(String id, OrderDTO order, String comment, int stars, Date date) {
        this.id = id;
        this.order = order;
        this.comment = comment;
        this.stars = stars;
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public OrderDTO getOrder() {
        return order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ReviewDTO reviewDTO)) return false;
        return Objects.equals(id, reviewDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
