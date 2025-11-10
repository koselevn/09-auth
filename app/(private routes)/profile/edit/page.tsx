import Link from "next/link"
import css from "./ProfilePage.module.css"
import { SITE_URL } from "@/lib/host"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Profile - NoteHub",
    description: "Your profile in NoteHub. Create notes easily and simply with NoteHub",
    openGraph: {
        title: 'Profile - NoteHub',
        description: 'Your profile in NoteHub. Create notes easily and simply with NoteHub',
        url: `${SITE_URL}/profile`,
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub',
            }
    ]
  }
}

export default function ProfilePage() {
    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="" className={css.editProfileButton}>Edit Profile</Link>
                </div>
                <div className={css.avatarWrapper}>
                    <img src="Avatar" alt="User Avatar" width={120} height={120} className={css.avatar} />
                </div>
                <div className={css.profileInfo}>
                    <p>Username: your_username</p>
                    <p>Email: your_email@example.com</p>
                </div>
            </div>
        </main>
    )
}