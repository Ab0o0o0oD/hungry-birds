package com.restaurant.hungry.birds.domain.dto

data class CreateVippsWebPaymentDto(
    val amount: AmountDto,
    val paymentMethod: PaymentMethodDto,
    val customer: CustomerDto,
    val reference: String,
    val userFlow: String,
    val returnUrl: String,
    val paymentDescription: String,
)

data class AmountDto(
    val value: Int,
    val currency: String,
)

data class PaymentMethodDto(
    val type: String,
)

data class CustomerDto(
    val phoneNumber: Long,
)
