import {ProviderootService} from '../../../service/provideroot.service';
import { Component, OnInit,Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-deletep',
  templateUrl: './deletep.component.html',
  styleUrls: ['./deletep.component.scss']
})
export class DeletepComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletepComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: ProviderootService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data);
  }
  ngOnInit() {
  }
}



 
  

