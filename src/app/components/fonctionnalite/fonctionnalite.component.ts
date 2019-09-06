import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FonctionnaliteService } from 'app/service/fonctionnalite.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Fonctionnalite } from 'app/model/Fonctionnalite';
import { ProviderResponse } from 'app/model/ProviderResponse';
import { analyzeAndValidateNgModules } from '@angular/compiler';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  libelle: string;
  fonctionnaliteFilles?: FoodNode[];
}


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  libelle: string;
  level: number;
}

@Component({
  selector: 'app-fonctionnalite',
  templateUrl: './fonctionnalite.component.html',
  styleUrls: ['./fonctionnalite.component.scss']
})
export class FonctionnaliteComponent implements OnInit {
  TREE_DATA: FoodNode[] = [

  ];
  currentOrientation = 'horizontal';

  FormFonc: FormGroup;
  submited = false;
  fonc: Object;
  list:any[];
  Result: ProviderResponse = new ProviderResponse();
  user:any;
  pro:Object;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.fonctionnaliteFilles && node.fonctionnaliteFilles.length > 0,
      libelle: node.libelle,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.fonctionnaliteFilles);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private service: FonctionnaliteService, private builder: FormBuilder) {
    this.FormFonc = this.builder.group({
      code: ['', Validators.required],
      icone: ['', Validators.required],
      libelle: ['', Validators.required],
      url: ['', Validators.required],
      fpere: [],
    });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  ngOnInit() {
    this.service.getAllFonctionnalite().subscribe((par: any) => {
      this.TREE_DATA = par.providerInfo;
      this.dataSource.data = par.providerInfo;
    })
    this.service.getAllNonTreeFonctionnalite().subscribe((par: any) => {

      this.fonc = par.providerInfo;
    })


    this.service.getusers().subscribe((par: ProviderResponse) => {
      this.user = par.providerInfo
    //  par.providerInfo=5;
   // this.list.push({user: par.providerInfo,profiles: this.getProfilebyuserid(this.user.id)})
    })
  }
$
  getProfilebyuserid(id) {
    this.service.getProfilesbyuserID(id).subscribe((par: ProviderResponse) => {
   
      this.pro=par;
      return par.providerInfo;

    })

  }
  onSubmit() {
    this.submited = false;
    if (this.FormFonc.invalid) {
      return;
    }
    let F = new Fonctionnalite();
    F = this.FormFonc.value;
    if (this.FormFonc.value.fpere == null) {
      F.fpere = -1;
    }
    else {
      F.fpere = this.FormFonc.value.fpere.fonctionnaliteId;
    }

    this.service.AddFonctionnalite(F).then(res => {
      this.Result = res;
      if (this.Result.result == 0) {
        window.location.reload();
      }
    });
  }

}
