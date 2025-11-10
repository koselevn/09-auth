"use client"

import { useAuth } from "@/lib/store/authStore"
import css from "./EditProfilePage.module.css"

export default function EditProfilePage() {
    const {user} = useAuth()
    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>
                <img src="avatar" alt="User Avatar" width={120} height={120} className={css.avatar} />
                <form className={css.profileInfo}>
                <div className={css.usernameWrapper}>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" className={css.input} />
                </div>
                    <p>Email: {user.email}</p>
                <div className={css.actions}>
                    <button type="submit" className={css.saveButton}>Save</button>
                    <button type="button" className={css.cancelButton}>Cancel</button>
                </div>
                </form>
            </div>
            </main>
    )
}