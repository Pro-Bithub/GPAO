import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Issue } from '../models/issue';
import { Article } from '../models/Article';

@Injectable()
export class DataArticleService {
	private readonly API_URL = 'http://localhost:8080/';

	dataChange: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
	// Temporarily stores data from dialogs
	dialogData: any;

	constructor(private httpClient: HttpClient) {}

	get data(): Article[] {
		return this.dataChange.value;
	}

	getDialogData() {
		return this.dialogData;
	}

	/** CRUD METHODS */
	getAllIssues(): void {
		this.httpClient.get<Article[]>(this.API_URL).subscribe(
			(data) => {
				this.dataChange.next(data);
			},
			(error: HttpErrorResponse) => {
				console.log(error.name + ' ' + error.message);
			}
		);
	}

	// DEMO ONLY, you can find working methods below
	addIssue(Issue: Article): void {
		this.dialogData = Issue;
	
	}

	updateIssue(Issue: Article): void {
		this.dialogData = Issue;
	}

	deleteIssue(id: number): void {
		console.log(id);
	}
}

/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/
