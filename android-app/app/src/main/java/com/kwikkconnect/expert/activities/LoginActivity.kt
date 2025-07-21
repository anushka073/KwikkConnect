package com.kwikkconnect.expert.activities

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.kwikkconnect.expert.R
import com.kwikkconnect.expert.databinding.ActivityLoginBinding
import com.kwikkconnect.expert.services.ApiService
import com.kwikkconnect.expert.utils.Constants
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private lateinit var apiService: ApiService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupApiService()
        setupUI()
    }

    private fun setupApiService() {
        val retrofit = Retrofit.Builder()
            .baseUrl(Constants.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        apiService = retrofit.create(ApiService::class.java)
    }

    private fun setupUI() {
        // Pre-fill demo credentials
        binding.emailInput.setText(Constants.DEMO_EXPERT_EMAIL)
        binding.nameInput.setText(Constants.DEMO_EXPERT_NAME)

        binding.loginButton.setOnClickListener {
            val email = binding.emailInput.text.toString()
            val name = binding.nameInput.text.toString()

            if (email.isNotEmpty() && name.isNotEmpty()) {
                loginExpert(email, name)
            } else {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun loginExpert(email: String, name: String) {
        binding.loginButton.isEnabled = false
        binding.progressBar.visibility = android.view.View.VISIBLE

        lifecycleScope.launch {
            try {
                val response = apiService.registerExpert(mapOf(
                    "email" to email,
                    "name" to name
                ))

                if (response.isSuccessful) {
                    // Save expert info (you can use SharedPreferences here)
                    val intent = Intent(this@LoginActivity, MainActivity::class.java)
                    intent.putExtra("expert_email", email)
                    intent.putExtra("expert_name", name)
                    startActivity(intent)
                    finish()
                } else {
                    Toast.makeText(this@LoginActivity, "Login failed", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Toast.makeText(this@LoginActivity, "Network error: ${e.message}", Toast.LENGTH_SHORT).show()
            } finally {
                binding.loginButton.isEnabled = true
                binding.progressBar.visibility = android.view.View.GONE
            }
        }
    }
} 