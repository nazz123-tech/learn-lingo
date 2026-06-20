import { useTeachers } from "@/hooks/useTeachers";

export default function TeachersPage (){
    const {teachers, loading, hasMore, loadMore}=useTeachers();
    return ( 
        <div>
            {teachers.map((teacher)=>(
                <TeacherCard teacher={teacher}/>
            ))}
        </div>
    )
}