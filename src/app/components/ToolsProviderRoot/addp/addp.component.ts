import { ProviderootService } from 'app/service/provideroot.service';
import { ProviderRoot } from 'app/model/ProviderRoot';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms'
@Component({
  selector: 'app-addp',
  templateUrl: './addp.component.html',
  styleUrls: ['./addp.component.scss']
})
export class AddpComponent implements OnInit {
  fileToUpload: File = null;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
  constructor(public dialogRef: MatDialogRef<AddpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProviderRoot,
    public dataService: ProviderootService) { }

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
this.dataService.postFile(this.fileToUpload);
}

  ngOnInit() {
  }

}
