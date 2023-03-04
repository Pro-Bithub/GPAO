import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormControl, Validators } from '@angular/forms';
import { Issue } from '../../models/issue';

@Component({
	selector: 'app-add.dialog',
	templateUrl: '../../dialogs/add/add.dialog.html',
	styleUrls: [ '../../dialogs/add/add.dialog.css' ]
})
export class AddDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<AddDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Issue,
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
		this.data.statut="Nouveau";
		this.dataService.addIssue(this.data);
	}
}
/* Nouveau : l'OF a été créé mais la production n'a pas encore commencé.
En cours : la production a commencé et est en cours.
En attente : l'OF est en attente de matériaux, de pièces ou d'autres ressources pour pouvoir poursuivre la production.
Suspendu : la production de l'OF est temporairement arrêtée, par exemple en raison d'un problème technique ou de la non-disponibilité de certaines ressources.
Terminé : la production de l'OF est terminée et les produits finis sont prêts à être expédiés ou stockés.
Annulé : l'OF a été annulé avant ou pendant la production. */