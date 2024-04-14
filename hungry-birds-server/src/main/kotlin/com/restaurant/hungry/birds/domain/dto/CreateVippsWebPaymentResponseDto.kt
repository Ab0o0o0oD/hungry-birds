package com.restaurant.hungry.birds.domain.dto

data class CreateVippsWebPaymentResponseDto(
    val redirectUrl: String,
    val reference: String,
)
