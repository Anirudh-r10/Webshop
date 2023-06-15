import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROW_HEIGHT:{[id:number]:number}={1:400, 3:335, 4:350};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  cols=3;
  category:string|undefined;
  rowHeight=ROW_HEIGHT[this.cols] ;
  products:Array<Product>|undefined;
  sort='desc';
  count='12';
  prodcutsSubscription:Subscription|undefined;

  constructor(private cartService:CartService,private storeService:StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts():void {
    this.prodcutsSubscription=this.storeService.getAllProducts(this.count, this.sort,this.category)
    .subscribe((_products)=>{
      this.products=_products;
    });
  }
  onItemsCountChange(newCount:number):void{
    this.count=newCount.toString();
    this.getProducts();
  }

  onSortChange(newSort:string):void{
    this.sort=newSort;
    this.getProducts();
  }
  

  onColoumnsCountChange(colsNum:number):void{
    this.cols=colsNum;
    this.rowHeight=ROW_HEIGHT[this.cols] ;
  }

  onShowCategory(newCategory:string):void{
  this.category=newCategory;
  this.getProducts();
  }


  onAddToCart(product:Product):void{
    this.cartService.addToCart({
      product:product.image,
      name:product.title,
      price:product.price,
      quantity:1,
      id:product.id
    })
  }

  ngOnDestroy():void{
    if(this.prodcutsSubscription){
      this.prodcutsSubscription.unsubscribe();
    }
  }
  
}
