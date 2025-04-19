
package com.example.fitjourney.fitness

import android.app.Dialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.DialogFragment
import com.example.fitjourney.R
import com.google.android.material.button.MaterialButtonToggleGroup

class DifficultyDialogFragment(
    private val categoryName: String,
    private val onDifficultySelected: (String) -> Unit
) : DialogFragment() {
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.dialog_difficulty_selector, container, false)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        val titleText = view.findViewById<TextView>(R.id.dialog_title)
        titleText.text = "Select $categoryName Difficulty"
        
        val toggleGroup = view.findViewById<MaterialButtonToggleGroup>(R.id.difficulty_toggle_group)
        val beginnerBtn = view.findViewById<Button>(R.id.beginner_button)
        val intermediateBtn = view.findViewById<Button>(R.id.intermediate_button)
        val advancedBtn = view.findViewById<Button>(R.id.advanced_button)
        
        val startButton = view.findViewById<Button>(R.id.start_button)
        startButton.setOnClickListener {
            val difficulty = when (toggleGroup.checkedButtonId) {
                R.id.beginner_button -> "Beginner"
                R.id.intermediate_button -> "Intermediate"
                R.id.advanced_button -> "Advanced"
                else -> "Beginner" // Default
            }
            
            onDifficultySelected(difficulty)
            dismiss()
        }
        
        // Set default selection
        beginnerBtn.isChecked = true
    }
    
    override fun onStart() {
        super.onStart()
        dialog?.window?.setLayout(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
    }
}
