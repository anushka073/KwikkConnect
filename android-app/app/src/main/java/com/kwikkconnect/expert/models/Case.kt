package com.kwikkconnect.expert.models

data class Case(
    val id: String,
    val title: String,
    val description: String,
    val priority: String,
    val status: String,
    val assignedTo: String?,
    val createdAt: String
) 