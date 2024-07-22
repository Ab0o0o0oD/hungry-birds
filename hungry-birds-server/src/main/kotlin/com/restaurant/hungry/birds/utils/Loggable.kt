package com.restaurant.hungry.birds.utils

import org.slf4j.Logger
import org.slf4j.LoggerFactory

interface Loggable

inline fun <reified T : Loggable> T.fetchLogger(): Logger = LoggerFactory.getLogger(T::class.java)
