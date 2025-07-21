package com.kwikkconnect.expert.activities

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.kwikkconnect.expert.R
import com.kwikkconnect.expert.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val expertEmail = intent.getStringExtra("expert_email") ?: "Unknown"
        val expertName = intent.getStringExtra("expert_name") ?: "Unknown"

        binding.welcomeText.text = "Welcome, $expertName!"
        binding.expertEmail.text = "Email: $expertEmail"

        Toast.makeText(this, "Successfully logged in!", Toast.LENGTH_SHORT).show()
    }
} 