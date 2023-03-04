import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormControl, Validators } from '@angular/forms';
import { OrdreFabrication } from '../../models/OrdreFabrication';

@Component({
	selector: 'app-add.dialog',
	templateUrl: '../../dialogs/add/add.dialog.html',
	styleUrls: [ '../../dialogs/add/add.dialog.css' ]
})
export class AddDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<AddDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: OrdreFabrication,
		public dataService: DataService
	) {}

	formControl = new FormControl('', [
		Validators.required
		// Validators.email,
	]);

	getErrorMessage() {
		return this.formControl.hasError('required')
			? 'champs requis'
			: this.formControl.hasError('email') ? 'Not a valid email' : '';
	}

	submit() {
		// empty stuff
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	public confirmAdd(): void {
		console.log('this.data');
		console.log(this.data);
		this.dataService.addIssue(this.data);
	}
}
