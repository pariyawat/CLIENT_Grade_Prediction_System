import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { SubjectListRoutingModule } from './subject-list-routing.module';
import { SubjectListComponent } from './subject-list.component';
import { Subject50Component } from './subject50/subject50.component';
import { Subject53Component } from './subject53/subject53.component';
import { Subject58Component } from './subject58/subject58.component';
import { SubjectListService } from './subject-list.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        MaterialModule,
        SubjectListRoutingModule,
        MaterialModule,
        CommonModule

    ],
    declarations: [
        SubjectListComponent,
        Subject50Component,
        Subject53Component,
        Subject58Component,
    ],
    providers: [
        SubjectListService
    ]
})
export class SubjectListModule { }
