package com.restaurant.hungry.birds.config

import com.fasterxml.jackson.databind.ObjectMapper
import com.restaurant.hungry.birds.utils.executeAndRead
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class HttpClientConfig(
    @Value("\${vipps.token-uri}") private val tokenUrl: String,
    @Value("\${vipps.client-id}") private val clientId: String,
    @Value("\${vipps.client-secret}") private val clientSecret: String,
    @Value("\${vipps.subscription-key}") private val subscriptionKey: String,
    private val objectMapper: ObjectMapper,
) {
    private val client = OkHttpClient()

    fun fetchJwtToken(): String {
        val request = Request.Builder()
            .url(tokenUrl)
            .post("".toRequestBody())
            .addHeader("client_id", clientId)
            .addHeader("client_secret", clientSecret)
            .addHeader("Ocp-Apim-Subscription-Key", subscriptionKey)
            .build()

        return client.newCall(request).executeAndRead(
            objectMapper,
            { throw RuntimeException("Failed to fetch JWT token: $it") },
            { token: Token? -> token!!.access_token },

        )
    }
}

data class Token(
    val access_token: String,
)
