"use client";
import css from "./page.module.css"
import {useRouter} from "next/navigation"
export default function Home() {
    const router=useRouter();
 return <main>
    <div className={css.container}>
        <div className={css.content}>
            <div className={css.info}>
                <h2 className={css.title}>Unlock your potential with the best  <span>language</span> tutors</h2>
            <p className={css.description}>Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
            <button className={css.button} onClick={()=>router.push("/teachers")}>Get Started</button>
            </div>
            <img className={css.image} src="/block.svg" alt="Language Learning"></img>
        </div>
        <div className={css.generalInfo}>
            <ul className={css.list}>
                <li className={css.item}>
                    <h2 className={css.count}>32000 +</h2>
                    <p className={css.option}>Experienced tutors</p>
                </li>
                <li className={css.item}>
                    <h2 className={css.count}>300000 +</h2>
                    <p className={css.option}>5-star tutor reviews</p>
                </li>
                <li className={css.item}>
                    <h2 className={css.count}>120 +</h2>
                    <p className={css.option}>Subjects taught</p></li>
                <li className={css.item}>
                    <h2 className={css.count}>200 +</h2>
                    <p className={css.option}>Tutor nationalities</p>
                </li>
            </ul>
        </div>
    </div>
 </main>
}