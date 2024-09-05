package com.heros_shop.heros_shop_api.dto;

import java.util.Objects;

public class ProductDTO {
    private String id;
    private String name;
    private String description;
    private String category;
    private double price;
    private String photo;
    private AddressDTO originAddress;

    public ProductDTO() {
    }

    public ProductDTO(String id, String name, String description, String category, double price, String photo, AddressDTO originAddress) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.photo = photo;
        this.originAddress = originAddress;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public AddressDTO getOriginAddress() {
        return originAddress;
    }

    public void setOriginAddress(AddressDTO originAddress) {
        this.originAddress = originAddress;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProductDTO that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", photo='" + photo + '\'' +
                ", originAddress=" + originAddress +
                '}';
    }
}
