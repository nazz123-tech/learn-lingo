import type { Metadata } from 'next';
import TeachersPageClient from './TeachersPapeClient';

export const metadata: Metadata = {
  title: 'Find a Teacher',
  description: 'Browse our list of professional teachers and book your first lesson.',
};

const TeachersPage=()=>{
    return (
        <TeachersPageClient/>
    )
}
export default TeachersPage;