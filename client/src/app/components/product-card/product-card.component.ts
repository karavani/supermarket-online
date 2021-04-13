import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  productID: number;
  @Input()
  productName: string;
  @Input()
  categoryID: number;
  @Input()
  price: number;
  @Input()
  imageURL: string;
  @Input()
  btnValue: string;

  // The event name the parent should hook to
  @Output() childEvent = new EventEmitter<string>();

  myClick() {
    // Sending the event to the parent
    this.childEvent.emit("Some string value from child to parent");
  }

  constructor() { }

  ngOnInit(): void {
  }

}
