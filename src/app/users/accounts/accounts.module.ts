import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ProfileTeacherComponent } from './profile-teacher/profile-teacher.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { StudentEmailComponent } from './profile-student/student-email/student-email.component';
import { StudentPasswordComponent } from './profile-student/student-password/student-password.component';
import { TeacherEmailComponent } from './profile-teacher/teacher-email/teacher-email.component';
import { TeacherPasswordComponent } from './profile-teacher/teacher-password/teacher-password.component';
import { AdminEditComponent } from './profile-admin/admin-edit/admin-edit.component';
import { AdminAddDataComponent } from './profile-admin/admin-add-data/admin-add-data.component';
import { AdminStudentDataComponent } from './profile-admin/admin-student-data/admin-student-data.component';
import { AdminTeacherDataComponent } from './profile-admin/admin-teacher-data/admin-teacher-data.component';
import { AdminGroupManageComponent } from './profile-admin/admin-group-manage/admin-group-manage.component';





@NgModule({
    imports: [
        MaterialModule,
        AccountsRoutingModule,
        CommonModule
    ],
    declarations: [
        AccountsComponent,
        ProfileStudentComponent,
        ProfileTeacherComponent,
        ProfileAdminComponent,
        StudentEmailComponent,
        StudentPasswordComponent,
        TeacherEmailComponent,
        TeacherPasswordComponent,
        AdminEditComponent,
        AdminAddDataComponent,
        AdminStudentDataComponent,
        AdminTeacherDataComponent,
        AdminGroupManageComponent,
    ]
})
export class AccountsModule { }
