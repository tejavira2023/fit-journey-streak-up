
package com.example.fitjourney.fitness

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.widget.LinearLayout
import android.widget.TextView
import com.example.fitjourney.R

class StreakDisplayView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : LinearLayout(context, attrs, defStyleAttr) {
    
    private val streakCountText: TextView
    private val streakLabelText: TextView
    
    init {
        orientation = VERTICAL
        LayoutInflater.from(context).inflate(R.layout.view_streak_display, this, true)
        
        streakCountText = findViewById(R.id.streak_count)
        streakLabelText = findViewById(R.id.streak_label)
    }
    
    fun setStreak(streak: Int) {
        streakCountText.text = streak.toString()
        streakLabelText.text = if (streak == 1) "Day Streak" else "Day Streak"
    }
}
