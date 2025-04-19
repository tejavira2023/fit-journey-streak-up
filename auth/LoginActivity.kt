
package com.example.fitjourney.auth

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.fitjourney.HomeActivity
import com.example.fitjourney.R
import com.example.fitjourney.utils.PreferenceManager
import com.google.android.material.textfield.TextInputLayout

class LoginActivity : AppCompatActivity() {
    private lateinit var emailInput: EditText
    private lateinit var passwordInput: EditText
    private lateinit var loginButton: Button
    private lateinit var signupText: TextView
    private lateinit var preferenceManager: PreferenceManager
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        
        preferenceManager = PreferenceManager(this)
        
        // Initialize views
        emailInput = findViewById(R.id.email_input)
        passwordInput = findViewById(R.id.password_input)
        loginButton = findViewById(R.id.login_button)
        signupText = findViewById(R.id.signup_text)
        
        // Set click listeners
        loginButton.setOnClickListener { 
            // In a real app, validate credentials from backend
            // For this example, we'll use dummy validation
            if (validateInput()) {
                performLogin()
            }
        }
        
        signupText.setOnClickListener {
            val intent = Intent(this, SignupActivity::class.java)
            startActivity(intent)
        }
    }
    
    private fun validateInput(): Boolean {
        val email = emailInput.text.toString().trim()
        val password = passwordInput.text.toString().trim()
        
        if (email.isEmpty()) {
            emailInput.error = "Email is required"
            return false
        }
        
        if (password.isEmpty()) {
            passwordInput.error = "Password is required"
            return false
        }
        
        return true
    }
    
    private fun performLogin() {
        // In a real app, you would verify credentials with a server
        // For this example, we'll simulate a successful login
        val email = emailInput.text.toString().trim()
        
        preferenceManager.setLoggedIn(true)
        preferenceManager.saveUserData("FitJourney User", email)
        
        // Navigate to home screen
        val intent = Intent(this, HomeActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }
}
