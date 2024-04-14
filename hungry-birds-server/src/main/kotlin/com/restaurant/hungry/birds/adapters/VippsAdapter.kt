package com.restaurant.hungry.birds.adapters

import com.fasterxml.jackson.databind.ObjectMapper
import com.restaurant.hungry.birds.domain.CreateVippsPayment
import com.restaurant.hungry.birds.domain.CreateVippsPaymentResponse
import com.restaurant.hungry.birds.domain.dto.AmountDto
import com.restaurant.hungry.birds.domain.dto.CreateVippsWebPaymentDto
import com.restaurant.hungry.birds.domain.dto.CreateVippsWebPaymentResponseDto
import com.restaurant.hungry.birds.domain.dto.CustomerDto
import com.restaurant.hungry.birds.domain.dto.PaymentMethodDto
import com.restaurant.hungry.birds.utils.executeAndRead
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class VippsAdapter(
    @Value("\${vipps.url}") private val vippsUrl: String,
    @Qualifier("vipps-client-with-jwt")
    private val httpClient: OkHttpClient,
    private val objectMapper: ObjectMapper,
) {

    fun createVippsPayment(createVippsPayment: CreateVippsPayment): CreateVippsPaymentResponse {
        val request = Request.Builder()
            .url("$vippsUrl/epayment/v1/payments")
            .post(objectMapper.writeValueAsBytes(createVippsPayment.toDto()).toRequestBody(JSON))
            .build()

        return httpClient.newCall(request).executeAndRead(
            objectMapper,
            {
                throw RuntimeException(
                    "Could not create vipps web payment. Response: ${
                        objectMapper.readValue(
                            it.body?.string(),
                            VippsErrorResponse::class.java,
                        )
                    }",
                )
            },
            { createVippsWebPaymentResponse: CreateVippsWebPaymentResponseDto? -> createVippsWebPaymentResponse!!.toDomain() },
        )
    }

    fun CreateVippsPayment.toDto() = CreateVippsWebPaymentDto(
        amount = AmountDto(
            value = this.value,
            currency = "NOK",
        ),
        paymentMethod = PaymentMethodDto(
            type = "WALLET",
        ),
        customer = CustomerDto(
            phoneNumber = this.phoneNumber,
        ),
        reference = this.reference,
        userFlow = "WEB_REDIRECT",
        returnUrl = this.returnUrl,
        paymentDescription = this.paymentDescription,
    )

    fun CreateVippsWebPaymentResponseDto.toDomain() = CreateVippsPaymentResponse(
        redirectUrl = redirectUrl,
        reference = reference,
    )

    companion object {
        private val JSON = "application/json".toMediaTypeOrNull()
    }
}

data class VippsErrorResponse(
    val type: String?,
    val title: String?,
    val status: String?,
    val detail: String?,
    val instance: String?,
    val traceId: String?,
)
