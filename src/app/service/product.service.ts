import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductResponse } from 'app/model/ProductResponse';
import { Product } from 'app/model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http:HttpClient) {}
    GetAllCategory()
    {
      return this.http.get('http://localhost:8085/v1/api/provider/product/Findallcategory')
    }
   
    GetSubCategoryByCategory(IdCategory:Number)
    {
      return this.http.get('http://localhost:8085/v1/api/provider/product/category/GetSubCategoryByCategoryId/'+IdCategory);

    }

    GetAllBrand()
    {
      return this.http.get('http://localhost:8085/v1/provider/GetAllBrands')
    }
    AddNewProduct(product:Product,idcategorie : Number,brandId : Number,vatId : Number)
    {
      return this.http.post<ProductResponse>("http://localhost:8085/v1/provider/product/addproduct?idcategorie="+idcategorie+"&brandId="+brandId+"&vatId="+vatId,product).toPromise();
    }

    GetAllCharacteristicByCategory(IdCategory:Number)
    {
      return this.http.get('http://localhost:8085/v1/Category/getAllCharacteristic/'+IdCategory);

    }

    GetAllValuesByCharacteristic(IdChar:Number)
    {
      return this.http.get('http://localhost:8085/v1/Category/Characteristic/getAllValue/'+IdChar);

    }

    AddNewProductCharacteristic(idProduct : Number,CharId : Number,Value : String)
    {
      return this.http.post<ProductResponse>("http://localhost:8085/v1/provider/AddCharToProduct?idproduct="+idProduct+"&charcteristiqueid="+CharId+"&Value="+Value,null).toPromise();
    }
    GetAllVat()
    {
      return this.http.get('http://localhost:8085/v1/getAllVat');

    }
}
