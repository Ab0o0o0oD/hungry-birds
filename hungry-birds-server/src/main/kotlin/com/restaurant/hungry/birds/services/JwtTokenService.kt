package com.restaurant.hungry.birds.services
import com.restaurant.hungry.birds.config.HttpClientConfig
import org.springframework.stereotype.Service

@Service
class JwtTokenService(
    private val httpClientConfig: HttpClientConfig,
) {
    private var jwtToken: String = ""

    fun getJwtToken(): String {
        if (jwtToken.isBlank()) {
            jwtToken = httpClientConfig.fetchJwtToken()
        }
        return jwtToken
    }
}
