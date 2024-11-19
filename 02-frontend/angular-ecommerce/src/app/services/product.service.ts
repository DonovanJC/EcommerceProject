import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoriesUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCatoryId: number): Observable<Product[]> {

    //build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCatoryId}`;

    return this.httpClient.get<GetProductsResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    
    return this.httpClient.get<GetCategoriesResponse>(this.categoriesUrl).pipe(
      map(response => response._embedded.productCategory) // Corrected path
    );
  }

  //search products containing keyword
  getSearchProducts(searchValue: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${searchValue}`

    return this.httpClient.get<GetProductsResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  
  //get details of a specific product
  getProductDetails(productId: number): Observable<Product>{
    const searchurl = `${this.baseUrl}/${productId}`

    return this.httpClient.get<Product>(searchurl);
  }

}

interface GetProductsResponse{
  _embedded: {
    products: Product[];
  }
}

interface GetCategoriesResponse{
  _embedded: {
    productCategory: ProductCategory[];
  }
}
