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
      <Link href="/">LearnLingo</Link>

      <nav>
        <Link href="/">Home</Link>
        <Link href="/teachers">Teachers</Link>
        {user && <Link href="/favourites">Favorites</Link>}
      </nav>

      {user ? (
        <div>
          <p>{user.displayName}</p>
          <button onClick={handleLogout}>Вийти</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setModalType("login")}>Увійти</button>
          <button onClick={() => setModalType("register")}>Реєстрація</button>
        </div>
      )}

      {modalType && (
        <Modal onClose={handleClose}>
          {modalType === "login" && <LoginForm onClose={handleClose} />}
          {modalType === "register" && <RegisterForm onClose={handleClose} />}
        </Modal>
      )}
    </header>
    )
}