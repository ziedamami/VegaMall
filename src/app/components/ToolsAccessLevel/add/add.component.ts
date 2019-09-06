import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FonctionnaliteService} from '../../../service/fonctionnalite.service';
import {FormControl, Validators} from '@angular/forms'
import {Profile} from '../../../model/Profile';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile,
    public dataService: FonctionnaliteService) { }

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

}

onNoClick(): void {
this.dialogRef.close();
}

public confirmAdd(): void {
this.dataService.addIssue(this.data);

}

  ngOnInit() {
  }

}
