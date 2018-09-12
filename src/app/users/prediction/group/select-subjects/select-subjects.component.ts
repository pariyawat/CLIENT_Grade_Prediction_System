import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { NgxAlertsService } from '@ngx-plus/ngx-alerts';
import { AuthenticationService } from '../../../../@common/service/authentication.service';

@Component({
  selector: 'app-select-subjects',
  templateUrl: './select-subjects.component.html',
  styleUrls: ['./select-subjects.component.css']
})
export class SelectSubjectsComponent implements OnInit {


  constructor() { }

  ngOnInit() {

  }


}
