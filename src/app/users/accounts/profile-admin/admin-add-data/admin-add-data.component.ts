import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from '../../accounts.service';

@Component({
  selector: 'app-admin-add-data',
  templateUrl: './admin-add-data.component.html',
  styleUrls: ['./admin-add-data.component.css']
})
export class AdminAddDataComponent implements OnInit {
  @ViewChild('csvData') _file: ElementRef;
  private data: any;
  private dataOfSUB;
  constructor(
    private papa: PapaParseService,
    private toastr: ToastrService,
    private service: AccountsService
  ) { }

  ngOnInit() {
  }
  public onCSV() {
    const files = this._file.nativeElement.files;
    const blob: Blob = new Blob(files, { type: 'text/csv' });
    this.data = blob;

    const options = {
      header: true,
      complete: (results, file) => {
        this.dataOfSUB = results;
        console.log(this.dataOfSUB);
      },
    };

    this.papa.parse(this.data, options);
  }

  public onAddGrade() {
    if (!this.dataOfSUB || this.dataOfSUB.data.length <= 0) {
      this.toastr.warning('กรุณาเลือกไฟล์ CSV ของคุณ', 'Warning');
    } else {
      this.service.adminUploadData(this.dataOfSUB.data)
        .then((response) => {
          if (response === 'success') {
            this.toastr.success(`เพิ่มผลการเรียนแล้ว`, 'Success');
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  }

  public download() {
    const link = document.createElement('a');
    link.href = 'assets/csv/data_learn_model.csv';
    link.click();
  }

}
