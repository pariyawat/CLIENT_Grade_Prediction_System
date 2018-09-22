import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeHistoryComponent } from './grade-history.component';
import { GradeTeacherComponent } from './grade-teacher/grade-teacher.component';
import { GradeStudentComponent } from './grade-student/grade-student.component';
import { TeacherAddComponent } from './teacher-add/teacher-add.component';





const routes: Routes = [
{
    path: '',
    component: GradeHistoryComponent,
    children: [
        {
            path: 'student',
            component: GradeStudentComponent
        },
        {
            path: 'teacher',
            component: GradeTeacherComponent
        },
        {
            path: 'teacher-add',
            component: TeacherAddComponent
        }
    ]
}

];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [RouterModule],
})
export class GradeHistoryRoutingModule { }
