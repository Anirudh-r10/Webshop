import { Component, OnInit,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: 'products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent implements OnInit {
  @Output() coloumnCountChange=new EventEmitter<number>();
  @Output() sortChange=new EventEmitter<string>();
  @Output() itemsCountChange=new EventEmitter<number>();
  
  sort='desc';
  itemsShowCount=15;
  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated(newSort:string): void{
    this.sort=newSort;
    this.sortChange.emit(newSort);
  }
  onItemsUpdated(count:number):void{
    this.itemsShowCount=count;
    this.itemsCountChange.emit(count);
  }
  onColoumnsUpdated(colsNum:number):void{
    this.coloumnCountChange.emit(colsNum);
  }

}
