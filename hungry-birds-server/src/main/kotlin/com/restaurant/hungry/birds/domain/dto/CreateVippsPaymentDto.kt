package com.restaurant.hungry.birds.domain.dto

data class CreateVippsPaymentDto(
    val value: Int,
    val phoneNumber: Long,
    val reference: String,
    val returnUrl: String,
    val paymentDescription: String,
)
