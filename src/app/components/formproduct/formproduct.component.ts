import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {MenuItem} from 'primeng/api';
import {MatStepperModule} from '@angular/material/stepper';
import { ProductService } from 'app/service/product.service';
import { CategoryResponse } from 'app/model/CategoryResponse';
import { BrandResponse } from 'app/model/BrandResponse';
import { ProductResponse } from 'app/model/ProductResponse';
import { Product } from 'app/model/Product';
import { CharResponse } from 'app/model/CharResponse';
import { UploadImageService } from 'app/service/upload-image.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';



@Component({
  selector: 'app-formproduct',
  templateUrl: './formproduct.component.html',
  styleUrls: ['./formproduct.component.scss']
})
export class FormproductComponent implements OnInit {
SubCategory:CategoryResponse;
Category : CategoryResponse;
Char:CharResponse;
Value:any;
Brand : BrandResponse;
clickedID:any
productid:any;
charid:Number
brand:any
Vat:ProductResponse
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ThirdFormGroup: FormGroup;
  items: MenuItem[];
  showsub : boolean = false;
  
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  
  constructor(private _formBuilder: FormBuilder,private product : ProductService,private uploadService: UploadImageService) {
   
     
  
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      reference: ['', Validators.required],
      description: ['', Validators.required],
      priceht: ['', Validators.required],
      publicprice: ['', Validators.required],
      conventionprice: ['', Validators.required],
      withdelivery: ['', Validators.required],
      deliveryfees: ['', Validators.required],
      weight: ['', Validators.required],
      length: ['', Validators.required],
      height: ['', Validators.required],
      stock: ['', Validators.required],
      sn: ['', Validators.required],
      sku: ['', Validators.required],
      vat: ['', Validators.required],
      brand: ['', Validators.required],
      waranty: ['', Validators.required],
      isnew: ['', Validators.required],
      ispromotion: ['', Validators.required]


    });
    this.ThirdFormGroup = this._formBuilder.group({
      char: [''],
      item: ['']

    });
    this.product.GetAllCategory().subscribe((category:any)=>{
      this.Category=category.categoryInfo;
      console.log(category)
    
  });
  this.product.GetAllBrand().subscribe((brand:any)=>{
    this.Brand=brand.brandInfo;
  
});

this.product.GetAllVat().subscribe((Vat:any)=>{
  this.Vat=Vat.productInfo;
});


  }
  showsubCategory(IdCategory){
    this.product.GetSubCategoryByCategory(IdCategory).subscribe((subcategory:any)=>{
      this.SubCategory=subcategory.categoryInfo;
    this.showsub = true;
    console.log('clicked');
  });

  
}
 GetSelectedCategoryId(id:number){
  this.clickedID=id;
  console.log(id);
  
}
getProductid(id:number)
{
  this.productid=id;
  console.log(id);
}
GetBrandId(id:number){
  this.brand=id;
  console.log(id);
}


  addProduct(){

    let produit = new Product();
    produit=this.secondFormGroup.value;
   produit.brandid=this.secondFormGroup.value.brand.brandid;
   produit.idvat=this.secondFormGroup.value.vat.vatid;
    produit.idcategorie=this.clickedID;
    let brandid= produit.brandid
    let idcategorie=produit.idcategorie
    let vatid=produit.idvat;
    
    this.product.AddNewProduct(produit,idcategorie,brandid,vatid);
  }
  
  showProductCharacteristic(){
    

    this.product.GetAllCharacteristicByCategory(this.clickedID).subscribe((char:any)=>{
      this.Char=char.charInfo;
      
     
      
    
    });
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
 
  upload() {
    this.progress.percentage = 0;
 
    this.currentFileUpload = this.selectedFiles.item(0)
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    })
 
    this.selectedFiles = undefined
  }
  addProductCharacterstiic()
  {
    
  }


}


