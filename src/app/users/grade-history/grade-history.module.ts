import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeStudentComponent } from './grade-student/grade-student.component';
import { GradeTeacherComponent } from './grade-teacher/grade-teacher.component';
import { GradeHistoryComponent } from './grade-history.component';
import { GradeHistoryRoutingModule } from './grade-history-routing.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    GradeHistoryRoutingModule,
    MaterialModule
  ],
  declarations: [
    GradeStudentComponent,
    GradeTeacherComponent,
    GradeHistoryComponent
  ]
})
export class GradeHistoryModule { }
