
package com.example.fitjourney

import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import com.example.fitjourney.auth.LoginActivity
import com.example.fitjourney.fitness.FitnessCategoriesActivity
import com.example.fitjourney.fitness.StreakDisplayView
import com.example.fitjourney.utils.PreferenceManager
import com.google.android.material.card.MaterialCardView

class HomeActivity : AppCompatActivity() {
    private lateinit var preferenceManager: PreferenceManager
    private lateinit var streakDisplay: StreakDisplayView
    private lateinit var startWorkoutButton: Button
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
        
        preferenceManager = PreferenceManager(this)
        
        // Setup toolbar
        setSupportActionBar(findViewById(R.id.toolbar))
        supportActionBar?.title = "FitJourney"
        
        // Initialize views
        streakDisplay = findViewById(R.id.streak_display)
        startWorkoutButton = findViewById(R.id.start_workout_button)
        
        // Update streak display with user's current streak
        streakDisplay.setStreak(preferenceManager.getStreak())
        
        // Set click listeners
        startWorkoutButton.setOnClickListener {
            val intent = Intent(this, FitnessCategoriesActivity::class.java)
            startActivity(intent)
        }
        
        // Setup consultation card
        val consultCard = findViewById<MaterialCardView>(R.id.consult_card)
        consultCard.setOnClickListener {
            val intent = Intent(this, ConsultActivity::class.java)
            startActivity(intent)
        }
    }
    
    override fun onResume() {
        super.onResume()
        // Refresh streak count when returning to this activity
        streakDisplay.setStreak(preferenceManager.getStreak())
    }
    
    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.home_menu, menu)
        return true
    }
    
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.menu_account -> {
                val intent = Intent(this, AccountActivity::class.java)
                startActivity(intent)
                true
            }
            R.id.menu_logout -> {
                logout()
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }
    
    private fun logout() {
        preferenceManager.clearSession()
        val intent = Intent(this, LoginActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }
}
