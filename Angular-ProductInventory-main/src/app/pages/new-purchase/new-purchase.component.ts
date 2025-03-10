import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StockInventoryService } from '../../services/stock-inventory.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.css']
})
export class NewPurchaseComponent implements OnInit {
  purchaseObj: any = {
    "purchaseId": 0,
    "purchaseDate": "2023-09-23T11:00:36.277Z",
    "productId": 0,
    "quantity": 0,
    "supplierName": "",
    "invoiceAmount": 0,
    "invoiceNumber": ""
  };
  productList: any[] = [];

  constructor(
    private http: HttpClient,
    private stockService: StockInventoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.stockService.getAllProducts().subscribe(
      (res) => {
        this.productList = res.data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onSave() {
    this.stockService.createPurchase(this.purchaseObj).subscribe(
      (res) => {
        if (res.result) {
          alert("Purchase Done Successfully");
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
