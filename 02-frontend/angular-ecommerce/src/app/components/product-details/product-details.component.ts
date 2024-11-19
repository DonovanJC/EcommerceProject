import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService: ProductService,
              private route: ActivatedRoute){}

  product!: Product;

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails(){
    const productId: number = +this.route.snapshot.paramMap.get("id")!;

    this.productService.getProductDetails(productId).subscribe(
      data => {
        console.log("test " + JSON.stringify(data));
        this.product = data;
      }
    )
  }
}
