import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategdoryId: number = 1;
  currentCaregoryName: string = "";
  searchMode: boolean = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode) {
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }

  handleListProducts() {
    // check if "id" param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the id param string. convert string to a number using the + symbol
      this.currentCategdoryId = +this.route.snapshot.paramMap.get('id')!;

      //get the "name" param string
      this.currentCaregoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else {
      //not category id available... default to category id 1
      this.currentCategdoryId = 1;
      this.currentCaregoryName = 'Books';
    }

    //now get the products for the given category id
    this.productService.getProductList(this.currentCategdoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleSearchProducts() {
    const keyword = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.getSearchProducts(keyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
