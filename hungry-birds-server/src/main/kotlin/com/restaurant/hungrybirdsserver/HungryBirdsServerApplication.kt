package com.restaurant.hungrybirdsserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class HungryBirdsServerApplication

fun main(args: Array<String>) {
	runApplication<HungryBirdsServerApplication>(*args)
}
