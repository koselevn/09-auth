"use client"

import { useRouter } from 'next/navigation';
import css from './SignUpPage.module.css'
import { useAuth } from '@/lib/store/authStore';
import { useState, FormEvent } from 'react';
import { register } from '@/lib/api/clientApi';



export default function SignUpPage() {
    const router = useRouter();
    const { setUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const response = await register({ email: email, password: password });

            if (response.user) {
                // Оновлюємо глобальний стан
                setUser(response.user);
                // Перенаправляємо на /profile
                router.push("/profile");
            } else {
                setError(response.message || "Registration failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        }
    };

    return (
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
            <form className={css.form} onSubmit={handleSubmit}>
                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} id="email" type="email" name="email" className={css.input} required />
                </div>
                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} id="password" type="password" name="password" className={css.input} required />
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton}>Register</button>
                </div>
                
                {error && <p className={css.error}>{error}</p>}
            </form>
        </main>
    )
}