package com.restaurant.hungry.birds.domain

data class CreateVippsPayment(
    val value: Int,
    val phoneNumber: Long,
    val returnUrl: String,
    val paymentDescription: String,
)
