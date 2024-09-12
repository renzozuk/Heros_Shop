package com.heros_shop.heros_shop_api.mapper.modelMapper.config;

import com.heros_shop.heros_shop_api.entities.*;
import com.heros_shop.heros_shop_api.dto.*;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.createTypeMap(Address.class, AddressDTO.class)
                .addMapping(Address::getId, AddressDTO::setId);

        modelMapper.createTypeMap(AddressDTO.class, Address.class)
                .addMapping(AddressDTO::getId, Address::setId);

        modelMapper.createTypeMap(Order.class, OrderDTO.class)
                .addMapping(Order::getId, OrderDTO::setId);

        modelMapper.createTypeMap(OrderDTO.class, Order.class)
                .addMapping(OrderDTO::getId, Order::setId);

        modelMapper.createTypeMap(Product.class, ProductDTO.class)
                .addMapping(Product::getId, ProductDTO::setId);

        modelMapper.createTypeMap(ProductDTO.class, Product.class)
                .addMapping(ProductDTO::getId, Product::setId);

        modelMapper.createTypeMap(Review.class, ReviewDTO.class)
                .addMapping(Review::getId, ReviewDTO::setId);

        modelMapper.createTypeMap(ReviewDTO.class, Review.class)
                .addMapping(ReviewDTO::getId, Review::setId);

        modelMapper.createTypeMap(User.class, UserDTO.class)
                .addMapping(User::getId, UserDTO::setId);

        modelMapper.createTypeMap(UserDTO.class, User.class)
                .addMapping(UserDTO::getId, User::setId);

        return modelMapper;
    }
}
