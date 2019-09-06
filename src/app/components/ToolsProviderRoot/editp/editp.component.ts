import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {ProviderootService} from '../../../service/provideroot.service';
import {FormControl, Validators} from '@angular/forms';
import { ProviderRoot } from 'app/model/ProviderRoot';

@Component({
  selector: 'app-editp',
  templateUrl: './editp.component.html',
  styleUrls: ['./editp.component.scss']
})
export class EditpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProviderRoot, public dataService: ProviderootService) { }

formControl = new FormControl('', [
Validators.required
// Validators.email,
]);

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :
this.formControl.hasError('email') ? 'Not a valid email' :
'';
}

submit() {
// emppty stuff
}

onNoClick(): void {
this.dialogRef.close();
}

stopEdit(): void {
this.dataService.updateIssue(this.data);
}

  ngOnInit() {
  }

}
