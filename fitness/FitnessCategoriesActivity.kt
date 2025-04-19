
package com.example.fitjourney.fitness

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.fitjourney.R
import com.example.fitjourney.models.FitnessCategory
import com.google.android.material.appbar.MaterialToolbar

class FitnessCategoriesActivity : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: FitnessCategoriesAdapter
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_fitness_categories)
        
        // Setup toolbar with back button
        val toolbar = findViewById<MaterialToolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.title = "Fitness Categories"
        
        // Initialize RecyclerView
        recyclerView = findViewById(R.id.categories_recycler_view)
        recyclerView.layoutManager = GridLayoutManager(this, 2)
        
        // Create fitness categories
        val categories = createCategories()
        
        // Setup adapter
        adapter = FitnessCategoriesAdapter(categories) { category ->
            // Handle category click
            showDifficultyDialog(category)
        }
        recyclerView.adapter = adapter
    }
    
    private fun createCategories(): List<FitnessCategory> {
        return listOf(
            FitnessCategory(
                "Losing Weight",
                "Effective exercises for weight loss and burning calories",
                R.drawable.ic_weight_loss
            ),
            FitnessCategory(
                "Meditation",
                "Find peace and reduce stress with guided meditations",
                R.drawable.ic_meditation
            ),
            FitnessCategory(
                "Gaining Weight",
                "Build muscle mass and increase body weight healthily",
                R.drawable.ic_weight_gain
            ),
            FitnessCategory(
                "Yoga",
                "Improve flexibility, balance and mental clarity",
                R.drawable.ic_yoga
            )
        )
    }
    
    private fun showDifficultyDialog(category: FitnessCategory) {
        val dialogFragment = DifficultyDialogFragment(category.name) { difficulty ->
            // Navigate to the selected program
            val intent = Intent(this, FitnessProgramActivity::class.java).apply {
                putExtra("CATEGORY", category.name)
                putExtra("DIFFICULTY", difficulty)
            }
            startActivity(intent)
        }
        dialogFragment.show(supportFragmentManager, "DifficultyDialog")
    }
    
    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }
}
