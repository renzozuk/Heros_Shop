package com.heros_shop.heros_shop_api.dto;

import java.util.Objects;

public class UserDTO {
    private String id;
    private String email;
    private String password;
    private String name;
    private String cpf;
    private String phoneNumber;
    private String photo;
    private AddressDTO defaultAddress;

    public UserDTO() {
    }

    public UserDTO(String id, String email, String password, String name, String cpf, String phoneNumber, String photo, AddressDTO defaultAddress) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.cpf = cpf;
        this.phoneNumber = phoneNumber;
        this.photo = photo;
        this.defaultAddress = defaultAddress;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public AddressDTO getDefaultAddress() {
        return defaultAddress;
    }

    public void setDefaultAddress(AddressDTO defaultAddress) {
        this.defaultAddress = defaultAddress;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserDTO userDTO)) return false;
        return Objects.equals(id, userDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "id='" + id + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", cpf='" + cpf + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", photo='" + photo + '\'' +
                ", defaultAddress=" + defaultAddress +
                '}';
    }
}
