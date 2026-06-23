'use client'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import css from './Header.module.css'
import Link from 'next/link'
import Modal from '../Modal/Modal';
import { LoginForm } from '../forms/LoginForm/LoginForm';
import { RegisterForm } from '../forms/RegisterForm/RegisterForm';
import { LuLogIn } from "react-icons/lu";
type ModalType = "login" | "register" | null;

export const Header =() => {
    const [modalType,setModalType]=useState<ModalType>(null);
    const {user}=useAuth();
    const handleLogout = async ()=>{
      await signOut(auth);
    }
    const handleClose=()=>{
        setModalType(null);
    }
    return (
        <header className={css.header}>
          <div className={css.container}>
            <Link className={css.logo} href="/">
        <img className={css.logoImg} src="/ukraine.svg" alt="LearnLingo Logo" />
        LearnLingo</Link>

      <nav className={css.nav}>
        <Link className={css.navLink} href="/">Home</Link>
        <Link  className={css.navLink} href="/teachers">Teachers</Link>
        {user && <Link className={css.navLink} href="/favourites">Favourites</Link>}
      </nav>

      {user ? (
        <div className={css.userSection}>
          <p className={css.userName}>{user.displayName}</p>
          <button className={css.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className={css.authButtons}>
          <button className={css.loginButton} onClick={() => setModalType("login")}><LuLogIn className={css.loginIcon} />Login</button>
          <button className={css.registerButton} onClick={() => setModalType("register")}>Registration</button>
        </div>
      )}

      {modalType && (
        <Modal onClose={handleClose}>
          {modalType === "login" && <LoginForm onClose={handleClose} />}
          {modalType === "register" && <RegisterForm onClose={handleClose} />}
        </Modal>
      )}
          </div>
      
    </header>
    )
}