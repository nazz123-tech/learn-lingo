import { Teacher } from "@/types/teacher";
import { useState } from "react";

export default function TeacherCard({teacher}:{teacher:Teacher}){
    const [isFavourite, setIsFavourite]=useState<boolean>(false);
    const toggleHeart = (e:React.MouseEvent)=>{
        e.preventDefault();
        setIsFavourite(!isFavourite);

    }
    return (
        <div>
            <div>
                <img src={teacher.avatar_url}></img>
            </div>
            <div>
                <div></div>
            </div>
        </div>
    )
}