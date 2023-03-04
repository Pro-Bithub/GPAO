
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Issue } from '../models/issue';
import { DataSource } from '@angular/cdk/collections';
import { AddDialogComponent } from '../dialogs/add/add.dialog.component';
import { EditDialogComponent } from '../dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.dialog.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../models/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

	displayedColumns = [ 'id', 'reference', 'designation', 'stock',  'actions' ];
	exampleDatabase: DataService | null;
	dataSource: ExampleDataSource | null;
	index: number;
	id: number;

	constructor(public httpClient: HttpClient, public dialog: MatDialog, public dataService: DataService) {}

	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;
	@ViewChild(MatSort, { static: true })
	sort: MatSort;
	@ViewChild('filter', { static: true })
	filter: ElementRef;

	ngOnInit() {
		this.loadData();
	}

	refresh() {
		this.loadData();
	}

	addNew() {
		const dialogRef = this.dialog.open(AddDialogComponent, {
			data: { aticle: Article }
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result === 1) {
				// After dialog is closed we're doing frontend updates
				// For add we're just pushing a new row inside DataService
				this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
				this.refreshTable();
			}
		});
	}

	startEdit(
		i: number,
		id: number,
		reference: string,
		designation: string,
		stock: string,
		
	) {
		this.id = id;
		// index row is used just for debugging proposes and can be removed
		this.index = i;
		console.log(this.index);
		const dialogRef = this.dialog.open(EditDialogComponent, {
			data: { id: i+1, reference: reference, designation: designation, stock: stock }
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result === 1) {
				// When using an edit things are little different, firstly we find record inside DataService by id
				const foundIndex = this.exampleDatabase.dataChange.value.findIndex((x) => x.id === this.id);
				// Then you update that record using data from dialogData (values you enetered)
				this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
				// And lastly refresh table
				this.refreshTable();
			}
		});
	}

	deleteItem(i: number, id: number,reference: string, designation: string, stock: string) {
		this.index = i;
		this.id = id;
		const dialogRef = this.dialog.open(DeleteDialogComponent, {
			data: { id: id, reference: reference, designation: designation, stock: stock }
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result === 1) {
				const foundIndex = this.exampleDatabase.dataChange.value.findIndex((x) => x.id === this.id);
				// for delete we use splice in order to remove single object from DataService
				this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
				this.refreshTable();
			}
		});
	}

	private refreshTable() {
		// Refreshing table using paginator
		// Thanks yeager-j for tips
		// https://github.com/marinantonio/angular-mat-table-crud/issues/12
		this.paginator._changePageSize(this.paginator.pageSize);
	}

	/*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/

	public loadData() {
		this.exampleDatabase = new DataService(this.httpClient);
		this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
		fromEvent(this.filter.nativeElement, 'keyup')
			// .debounceTime(150)
			// .distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) {
					return;
				}
				this.dataSource.filter = this.filter.nativeElement.value;
			});
	}
}

export class ExampleDataSource extends DataSource<Article> {
	_filterChange = new BehaviorSubject('');

	get filter(): string {
		return this._filterChange.value;
	}

	set filter(filter: string) {
		this._filterChange.next(filter);
	}

	filteredData: Article[] = [];
	renderedData: Article[] = [];

	constructor(public _exampleDatabase: DataService, public _paginator: MatPaginator, public _sort: MatSort) {
		super();
		// Reset to the first page when the user changes the filter.
		this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<Article[]> {
		// Listen for any changes in the base data, sorting, filtering, or pagination
		const displayDataChanges = [
			this._exampleDatabase.dataChange,
			this._sort.sortChange,
			this._filterChange,
			this._paginator.page
		];

		this._exampleDatabase.getAllIssues();

		return merge(...displayDataChanges).pipe(
			map(() => {
				// Filter data
				this.filteredData = this._exampleDatabase.data.slice().filter((article: Article) => {
					const searchStr = (article.id +
						article.reference +
						article.designation +
						article.stock).toLowerCase();
					return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
				});

				// Sort filtered data
				const sortedData = this.sortData(this.filteredData.slice());

				// Grab the page's slice of the filtered sorted data.
				const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
				this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
				return this.renderedData;
			})
		);
	}

	disconnect() {}

	/** Returns a sorted copy of the database data. */
	sortData(data: Article[]): Article[] {
		if (!this._sort.active || this._sort.direction === '') {
			return data;
		}

		return data.sort((a, b) => {
			let propertyA: number | string = '';
			let propertyB: number | string = '';

			switch (this._sort.active) {
				case 'id':
					[ propertyA, propertyB ] = [ a.id, b.id ];
					break;
				case 'numero':
					[ propertyA, propertyB ] = [ a.reference, b.reference ];
					break;
				case 'dateDebut':
					[ propertyA, propertyB ] = [ a.designation, b.designation ];
					break;
				case 'dateFin':
					[ propertyA, propertyB ] = [ a.stock, b.stock ];
					break;
			
			}

			const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
			const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

			return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
		});
	}
}

