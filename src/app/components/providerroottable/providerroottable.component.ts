import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProviderootService} from '../../service/provideroot.service';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {ProviderRoot} from '../../model/ProviderRoot';
import {DataSource} from '@angular/cdk/collections';
import { AddpComponent } from '../ToolsProviderRoot/addp/addp.component';
import { EditpComponent } from '../ToolsProviderRoot/editp/editp.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Provider } from '@angular/compiler/src/core';
import { DeletepComponent } from '../ToolsProviderRoot/deletep/deletep.component';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-providerroottable',
  templateUrl: './providerroottable.component.html',
  styleUrls: ['./providerroottable.component.scss']
})
export class ProviderroottableComponent implements OnInit {
  displayedColumns = ['id', 'name', 'rs','rcs','billingaddress','logo','vatcode','isdeleted','actions'];
  exampleDatabase: ProviderootService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;

  //fonc 
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: ProviderootService,
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

  addNew(issue: ProviderRoot) {
    const dialogRef = this.dialog.open(AddpComponent, {
      data: {issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
      
       
       
       
        if(this.dataService.getresult()==-1){
          this.openSnackBar(" ce nom  du fournisseur existe deja  ","error  ")
          return
        }
        if(this.dataService.getresult()==-2){
          this.openSnackBar(" ce raison social  du fournisseur existe deja  ","error  ")
          return
        }
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
        this.openSnackBar("Ajouter Fournisseur","avec succes")

      }
    });
  }

  startEdit(i: number, id:number, name: string, rs: string,rcs:string,vatcode:string,logo:string,billingaddress:string) {
    this.id =id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditpComponent, {
      data: {id: id, name: name, rs: rs,rcs: rcs,vatcode: vatcode,logo: logo,billingaddress: billingaddress }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.openSnackBar("Editer Fournisseur","avec succes")

      }
    });
  }

  deleteItem(i: number, id:number, name: string, rs: string,rcs:string,vatcode:string,logo:string,billingaddress:string,isdeleted:number)  {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeletepComponent, {
      data: {id: id, name: name, rs: rs,rcs:rcs,vatcode:vatcode,logo:logo,billingaddress:billingaddress,isdeleted:isdeleted }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.openSnackBar("Supprimer Fournisseur","avec succes")

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
    this.exampleDatabase = new ProviderootService(this.httpClient);
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

export class ExampleDataSource extends DataSource<ProviderRoot> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: ProviderRoot[] = [];
  renderedData: ProviderRoot[] = [];

  constructor(public _exampleDatabase: ProviderootService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ProviderRoot[]> {
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
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: ProviderRoot) => {
          const searchStr = ( issue.id + issue.name + issue.rcs + issue.rs+issue.vatcode).toLowerCase();
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
  sortData(data: ProviderRoot[]): ProviderRoot[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'billingaddress': [propertyA, propertyB] = [a.billingaddress, b.billingaddress]; break;
        case 'logo': [propertyA, propertyB] = [a.logo, b.logo]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'rcs': [propertyA, propertyB] = [a.rcs, b.rcs]; break;
        case 'rs': [propertyA, propertyB] = [a.rs, b.rs]; break;
        case 'vatcode': [propertyA, propertyB] = [a.vatcode, b.vatcode]; break;



        
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
