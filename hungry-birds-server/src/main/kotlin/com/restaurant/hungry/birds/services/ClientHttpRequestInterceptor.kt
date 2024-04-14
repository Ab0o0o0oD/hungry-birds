package com.restaurant.hungry.birds.services

import okhttp3.Interceptor
import okhttp3.Response
import org.springframework.beans.factory.annotation.Value
import java.util.UUID

class ClientHttpRequestInterceptor(
    private val jwtTokenService: JwtTokenService,
    @Value("\${vipps.subscription-key}") private val subscriptionKey: String,
    @Value("\${vipps.msn}") private val msn: String,
) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
        val jwtToken = jwtTokenService.getJwtToken()
        val requestWithJwt = request.newBuilder()
            .addHeader(AUTHORIZATION_HEADER_NAME, "$BEARER_PREFIX$jwtToken")
            .addHeader(SUBSCRIPTION_KEY, subscriptionKey)
            .addHeader(CONTENT_TYPE, "application/json")
            .addHeader(MSN, msn)
            .addHeader(I_Key, UUID.randomUUID().toString())
        return chain.proceed(requestWithJwt.build())
    }

    companion object {
        const val AUTHORIZATION_HEADER_NAME = "Authorization"
        const val SUBSCRIPTION_KEY = "Ocp-Apim-Subscription-Key"
        const val BEARER_PREFIX = "Bearer "
        const val CONTENT_TYPE = "Content-Type"
        const val MSN = "Merchant-Serial-Number"
        const val I_Key = "Idempotency-Key"
    }
}
