import { Component } from '@angular/core';
import { StockInventoryService } from '../../services/stock-inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  productList: any[] = [];

  constructor(
    private stockService: StockInventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.stockService.getAllProducts().subscribe(
      (response) => {
        this.productList = response.data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  deleteProduct(productId: number) {
    this.stockService.deleteProduct(productId).subscribe(
      (response) => {
        if (response.result) {
          this.productList = this.productList.filter(p => p.productId !== productId);
          alert(response.message);
        } else {
          console.error('Failed to delete product:', response.message);
        }
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  editProduct(id: number)
  {
    this.router.navigate(['update-product', id]);
  }
}
