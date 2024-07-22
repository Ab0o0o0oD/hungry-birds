package com.restaurant.hungry.birds.domain.dto

data class CreateVippsPaymentDto(
    val value: Int,
    val phoneNumber: String,
    val returnUrl: String,
    val paymentDescription: String,
)
