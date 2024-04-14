package com.restaurant.hungry.birds.utils

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import okhttp3.Call
import okhttp3.Response

inline fun <reified T, reified I> Call.executeAndRead(
    objectMapper: ObjectMapper,
    onError: (response: Response) -> T,
    onSuccess: (I?) -> T,
): T =
    this.execute().use { response ->
        if (response.isSuccessful) {
            if (response.code == 204) {
                onSuccess(null)
            } else {
                val stringBody = response.body?.string()

                return if (!stringBody.isNullOrBlank()) {
                    onSuccess(objectMapper.readValue(stringBody))
                } else {
                    onSuccess(null)
                }
            }
        } else {
            onError(response)
        }
    }
