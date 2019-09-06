import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FonctionnaliteService} from '../../service/fonctionnalite.service';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Profile} from '../../model/Profile';
import {DataSource} from '@angular/cdk/collections';
import { AddComponent } from '../ToolsAccessLevel/add/add.component';
import { EditComponent } from '../ToolsAccessLevel/edit/edit.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DeleteComponent } from '../ToolsAccessLevel/delete/delete.component';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-profiletable',
  templateUrl: './profiletable.component.html',
  styleUrls: ['./profiletable.component.scss'],
  animations: [
     trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})




export class ProfiletableComponent implements OnInit {
  displayedColumns = ['profileId', 'code', 'designation','isactive','actions'];
  exampleDatabase: FonctionnaliteService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  profileId: number;

  //fonc 
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: FonctionnaliteService,
              private _snackBar: MatSnackBar) {}


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(issue: Profile) {
    const dialogRef = this.dialog.open(AddComponent, {
      data: {issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log(this.dataService.getresult())
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        if(this.dataService.getresult()==-1){
          this.openSnackBar(" ce code  de profile existe deja  ","error  ")
          return
        }
      
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
        this.openSnackBar("Ajouter Profile","avec succes")
    
      }
    });
  }

  startEdit(i: number, profileId:number, code: string, designation: string) {
    this.profileId = profileId;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(EditComponent, {
      data: {profileId: profileId, code: code, designation: designation, }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.profileId === this.profileId);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.openSnackBar("Editer Profile","avec succes")
      }
    });
  }

  deleteItem(i: number, profileId: number, code: string, designation: string,isactive:number) {
    this.index = i;
    this.profileId = profileId;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {profileId: profileId, code: code, designation: designation,isactive:isactive}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.profileId === this.profileId);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.openSnackBar("Supprimer Profile","avec succes")
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
    this.exampleDatabase = new FonctionnaliteService(this.httpClient);
    console.log(this.exampleDatabase);
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

export class ExampleDataSource extends DataSource<Profile> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Profile[] = [];
  renderedData: Profile[] = [];

  constructor(public _exampleDatabase: FonctionnaliteService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Profile[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: Profile) => {
          console.log(issue);
          const searchStr = (  issue.code + issue.designation + issue.isactive).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: Profile[]): Profile[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'profileId': [propertyA, propertyB] = [a.profileId, b.profileId]; break;
        case 'code': [propertyA, propertyB] = [a.code, b.code]; break;
        case 'designation': [propertyA, propertyB] = [a.designation, b.designation]; break;
        case 'isactive': [propertyA, propertyB] = [a.isactive, b.isactive]; break;
        
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  
  }


}
