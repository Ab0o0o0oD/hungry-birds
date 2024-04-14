package com.restaurant.hungry.birds.config

import com.restaurant.hungry.birds.services.ClientHttpRequestInterceptor
import okhttp3.OkHttpClient
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import

@Import(
    ClientHttpRequestInterceptor::class,
)
@Configuration
class RestTemplateConfig(
    private val clientHttpRequestInterceptor: ClientHttpRequestInterceptor,
) {
    @Qualifier("vipps-client-with-jwt")
    @Bean
    fun vippsHttpClient(): OkHttpClient =
        OkHttpClient().newBuilder()
            .addInterceptor(clientHttpRequestInterceptor)
            .build()
}
