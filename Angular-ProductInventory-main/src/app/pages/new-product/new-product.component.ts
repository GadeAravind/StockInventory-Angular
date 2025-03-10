import { Component, OnInit } from '@angular/core';
import { StockInventoryService } from '../../services/stock-inventory.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productObj: any = {
    "productId": 0,
    "productName": "",
    "categoryName": "",
    "createdDate": "2024-04-25T15:19:27.194Z",
    "price": 0,
    "productDetails": ""
  };
  productList: any[] = [];

  constructor(
    private stockService: StockInventoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    
  }

  onSave() {
    this.stockService.createProduct(this.productObj).subscribe(
      (res) => {
        if (res.result) {
          alert("Product Created Successfully");
        } else {
          alert(res.message);
        }
      },
      (error) => {
        console.error('API Error:', error);
        alert("API Error");
      }
    );
  }
}
