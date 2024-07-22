package com.restaurant.hungry.birds.services

import com.restaurant.hungry.birds.adapters.VippsAdapter
import com.restaurant.hungry.birds.domain.CreateVippsPayment
import com.restaurant.hungry.birds.domain.CreateVippsPaymentResponse
import com.restaurant.hungry.birds.utils.Loggable
import com.restaurant.hungry.birds.utils.fetchLogger
import org.springframework.stereotype.Service

@Service
class PaymentService(
    private val vippsAdapter: VippsAdapter,
) : Loggable {
    val logger = fetchLogger()
    fun createPayment(createVippsPayment: CreateVippsPayment): CreateVippsPaymentResponse {
        logger.info("Creating vipps payment for ${createVippsPayment.phoneNumber}")
        return vippsAdapter.createVippsPayment(createVippsPayment)
    }
}
