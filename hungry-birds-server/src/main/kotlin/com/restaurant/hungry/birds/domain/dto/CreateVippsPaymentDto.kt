package com.restaurant.hungry.birds.domain.dto

data class CreateVippsPaymentDto(
    val value: Int,
    val phoneNumber: Long,
    val returnUrl: String,
    val paymentDescription: String,
)
