import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  constructor(private router: Router) {
  }

  ngOnInit(){
  }

  doSearchProducts(value: string) {
    console.log(`Search input info: ${value}`);
    this.router.navigateByUrl(`/search/${value}`);
    }

}
