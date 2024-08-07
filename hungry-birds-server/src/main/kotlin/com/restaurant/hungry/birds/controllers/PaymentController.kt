package com.restaurant.hungry.birds.controllers

import com.restaurant.hungry.birds.domain.CreateVippsPayment
import com.restaurant.hungry.birds.domain.CreateVippsPaymentResponse
import com.restaurant.hungry.birds.domain.dto.CreateVippsPaymentDto
import com.restaurant.hungry.birds.domain.dto.CreateVippsPaymentResponseDto
import com.restaurant.hungry.birds.services.PaymentService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class PaymentController(
    private val paymentService: PaymentService,
) {

    @PostMapping("/create-payment")
    @CrossOrigin(origins = ["http://localhost:3000"])
    fun createPayment(
        @RequestBody createVippsPayment: CreateVippsPaymentDto,
    ): CreateVippsPaymentResponse =
        paymentService.createPayment(
            CreateVippsPayment(
                value = createVippsPayment.value,
                phoneNumber = createVippsPayment.phoneNumber.toLong(),
                returnUrl = createVippsPayment.returnUrl,
                paymentDescription = createVippsPayment.returnUrl,
            ),
        )
}

fun CreateVippsPaymentDto.toDomain() = CreateVippsPayment(
    value = this.value,
    phoneNumber = this.phoneNumber.toLong(),
    returnUrl = this.returnUrl,
    paymentDescription = this.paymentDescription,
)

fun CreateVippsPaymentResponse.toDto() = CreateVippsPaymentResponseDto(
    redirectUrl = this.redirectUrl,
    reference = this.reference,
)
