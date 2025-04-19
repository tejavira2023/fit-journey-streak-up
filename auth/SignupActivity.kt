
package com.example.fitjourney.auth

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.fitjourney.HomeActivity
import com.example.fitjourney.R
import com.example.fitjourney.utils.PreferenceManager

class SignupActivity : AppCompatActivity() {
    private lateinit var nameInput: EditText
    private lateinit var emailInput: EditText
    private lateinit var passwordInput: EditText
    private lateinit var confirmPasswordInput: EditText
    private lateinit var signupButton: Button
    private lateinit var loginText: TextView
    private lateinit var preferenceManager: PreferenceManager
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup)
        
        preferenceManager = PreferenceManager(this)
        
        // Initialize views
        nameInput = findViewById(R.id.name_input)
        emailInput = findViewById(R.id.email_input)
        passwordInput = findViewById(R.id.password_input)
        confirmPasswordInput = findViewById(R.id.confirm_password_input)
        signupButton = findViewById(R.id.signup_button)
        loginText = findViewById(R.id.login_text)
        
        // Set click listeners
        signupButton.setOnClickListener {
            if (validateInput()) {
                performSignup()
            }
        }
        
        loginText.setOnClickListener {
            finish() // Go back to login activity
        }
    }
    
    private fun validateInput(): Boolean {
        val name = nameInput.text.toString().trim()
        val email = emailInput.text.toString().trim()
        val password = passwordInput.text.toString()
        val confirmPassword = confirmPasswordInput.text.toString()
        
        if (name.isEmpty()) {
            nameInput.error = "Name is required"
            return false
        }
        
        if (email.isEmpty()) {
            emailInput.error = "Email is required"
            return false
        }
        
        if (password.isEmpty()) {
            passwordInput.error = "Password is required"
            return false
        }
        
        if (password != confirmPassword) {
            confirmPasswordInput.error = "Passwords do not match"
            return false
        }
        
        return true
    }
    
    private fun performSignup() {
        // In a real app, you would register with a server
        // For this example, we'll simulate a successful signup
        val name = nameInput.text.toString().trim()
        val email = emailInput.text.toString().trim()
        
        preferenceManager.setLoggedIn(true)
        preferenceManager.saveUserData(name, email)
        
        Toast.makeText(this, "Account created successfully", Toast.LENGTH_SHORT).show()
        
        // Navigate to home screen
        val intent = Intent(this, HomeActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }
}
