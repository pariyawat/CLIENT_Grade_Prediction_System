import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GradeStudentComponent } from './grade-student/grade-student.component';
import { GradeTeacherComponent } from './grade-teacher/grade-teacher.component';
import { GradeHistoryComponent } from './grade-history.component';
import { GradeHistoryRoutingModule } from './grade-history-routing.module';
import { MaterialModule } from '../../material.module';
import { GradeHistoryService } from './grade-history.service';
import { TeacherAddComponent } from './teacher-add/teacher-add.component';

@NgModule({
  imports: [
    CommonModule,
    GradeHistoryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    GradeStudentComponent,
    GradeTeacherComponent,
    GradeHistoryComponent,
    TeacherAddComponent
  ],
  providers: [
    GradeHistoryService
  ]
})
export class GradeHistoryModule { }
