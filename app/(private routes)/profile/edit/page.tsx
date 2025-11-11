"use client"

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useAuth } from "@/lib/store/authStore";
import { updateCurrentUser } from "@/lib/api/clientApi";

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuth()
  
  const [username, setUsername] = useState(user.username);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const updatedUser  = await updateCurrentUser({ username });
      if (updatedUser ) {
        setUser(updatedUser );
        router.push("/profile"); 
      } else {
        console.log("error!")
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };
    
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <img src="avatar" alt="User Avatar" width={120} height={120} className={css.avatar} />

          <form className={css.profileInfo}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input id="username"
                type="text"
                className={css.input}
              />
            </div>

            <p>Email: {user.email}</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button type="button" className={css.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    )
}