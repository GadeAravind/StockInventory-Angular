import { Component } from '@angular/core';
import { StockInventoryService } from '../../services/stock-inventory.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.css']
})
export class NewSaleComponent {

  saleObj: any = {
    "saleId": 0,
    "invoiceNumber": "",
    "customerName": "",
    "mobileNo": "",
    "saleDate": "2023-09-23T11:19:38.047Z",
    "productId": 0,
    "quantity": 0,
    "totalAmount": 0
  };
  productList: any[] = [];

  constructor(
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

  checkStock() {
    this.stockService.checkStock(this.saleObj.productId).subscribe(
      (res) => {
        if (res.data.quantity == 0) {
          alert("Stock Not Available : " + res.quantity);
        } else {
          alert(res.message);
        }
      },
      (error) => {
        console.error('Error checking stock:', error);
      }
    );
  }

  onSave() {
    this.stockService.createSale(this.saleObj).subscribe(
      (res) => {
        if (res.result) {
          alert("Sale Done Success");
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
