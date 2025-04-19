
package com.example.fitjourney

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.example.fitjourney.auth.LoginActivity
import com.example.fitjourney.utils.PreferenceManager

class MainActivity : AppCompatActivity() {
    private lateinit var preferenceManager: PreferenceManager
    
    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)
        
        preferenceManager = PreferenceManager(this)
        
        // Check if user is logged in
        if (preferenceManager.isLoggedIn()) {
            // Navigate to Home
            val intent = Intent(this, HomeActivity::class.java)
            startActivity(intent)
        } else {
            // Navigate to Login
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }
        
        finish() // Close this activity
    }
}
