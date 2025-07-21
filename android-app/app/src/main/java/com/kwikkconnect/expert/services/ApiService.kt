package com.kwikkconnect.expert.services

import com.kwikkconnect.expert.models.Case
import com.kwikkconnect.expert.models.Expert
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    @POST("register-expert")
    suspend fun registerExpert(
        @Body expert: Map<String, String>
    ): Response<Map<String, Any>>

    @GET("expert/{email}/cases")
    suspend fun getExpertCases(
        @Path("email") email: String
    ): Response<Map<String, List<Case>>>

    @PUT("cases/{id}/status")
    suspend fun updateCaseStatus(
        @Path("id") caseId: String,
        @Body status: Map<String, String>
    ): Response<Map<String, Any>>
} 