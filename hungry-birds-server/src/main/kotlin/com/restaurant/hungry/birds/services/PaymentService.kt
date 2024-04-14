package com.restaurant.hungry.birds.services

import com.restaurant.hungry.birds.adapters.VippsAdapter
import com.restaurant.hungry.birds.domain.CreateVippsPayment
import com.restaurant.hungry.birds.domain.CreateVippsPaymentResponse
import org.springframework.stereotype.Service

@Service
class PaymentService(
    private val vippsAdapter: VippsAdapter,
) {
    fun createPayment(createVippsPayment: CreateVippsPayment): CreateVippsPaymentResponse =
        vippsAdapter.createVippsPayment(createVippsPayment)
}
