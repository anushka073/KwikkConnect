package com.kwikkconnect.expert.models

data class Expert(
    val email: String,
    val name: String,
    val isOnline: Boolean = true
) 