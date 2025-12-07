"use client";

import { useEffect, useState } from "react";
import css from "./EditProfilePage.module.css";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";

export default function EditProfile() {
  const router = useRouter();
  const { setUser, user } = useAuthStore();
  const [username, setUserName] = useState(user?.username || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  useEffect(() => {
    if (user?.username) {
      setUserName(user.username);
    }
  }, [user]);
  const handleClose = () => router.back();
  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username.trim() || username === user?.username) {
      router.push("/profile");
      return;
    }
    const updateUser = await updateMe({ username });
    setUser(updateUser);
    router.push("/profile");
  };
  return (
    <div className={css.profileCard}>
      <h1 className={css.formTitle}>Edit Profile</h1>
      <Image
        src={user?.avatar || "https://api.dicebear.com/9.x/bottts/avif"}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />

      <form onSubmit={handleSaveUser} className={css.profileInfo}>
        <div className={css.usernameWrapper}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            className={css.input}
            onChange={handleChange}
            value={username}
            placeholder="Enter new name"
          />
        </div>

        <div className={css.emailWrapper}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            className={css.input}
            value={user?.email || ""}
            readOnly
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.saveButton}>
            Save
          </button>
          <button
            onClick={handleClose}
            type="button"
            className={css.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
