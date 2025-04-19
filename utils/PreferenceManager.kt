
package com.example.fitjourney.utils

import android.content.Context
import android.content.SharedPreferences

/**
 * Utility class to manage app preferences and user session data
 */
class PreferenceManager(context: Context) {
    private val preferences: SharedPreferences = context.getSharedPreferences(
        PREFERENCE_NAME, Context.MODE_PRIVATE
    )
    
    fun isLoggedIn(): Boolean {
        return preferences.getBoolean(KEY_IS_LOGGED_IN, false)
    }
    
    fun setLoggedIn(isLoggedIn: Boolean) {
        preferences.edit().putBoolean(KEY_IS_LOGGED_IN, isLoggedIn).apply()
    }
    
    fun saveUserData(name: String, email: String) {
        preferences.edit()
            .putString(KEY_USER_NAME, name)
            .putString(KEY_USER_EMAIL, email)
            .apply()
    }
    
    fun getUserName(): String {
        return preferences.getString(KEY_USER_NAME, "") ?: ""
    }
    
    fun saveStreak(streak: Int) {
        preferences.edit().putInt(KEY_STREAK, streak).apply()
    }
    
    fun getStreak(): Int {
        return preferences.getInt(KEY_STREAK, 0)
    }
    
    fun incrementStreak() {
        val currentStreak = getStreak()
        saveStreak(currentStreak + 1)
    }
    
    fun clearSession() {
        preferences.edit().clear().apply()
    }
    
    companion object {
        private const val PREFERENCE_NAME = "FitJourneyPreferences"
        private const val KEY_IS_LOGGED_IN = "isLoggedIn"
        private const val KEY_USER_NAME = "userName"
        private const val KEY_USER_EMAIL = "userEmail"
        private const val KEY_STREAK = "streak"
    }
}
