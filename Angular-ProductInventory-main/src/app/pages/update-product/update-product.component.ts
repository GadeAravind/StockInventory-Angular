import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockInventoryService } from 'src/app/services/stock-inventory.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  updateproductDetails: any = {};
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockInventoryService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.getProductById(this.productId);
  }

  getProductById(productId: number): void {
    this.stockService.getProductById(productId).subscribe(
      (data) => {
        this.updateproductDetails = data.data;
        this.updateproductDetails.createdDate = this.datePipe.transform(this.updateproductDetails.createdDate, 'yyyy-MM-dd');
        console.log(data);
      },
      (error) => {
        console.error('Error fetching purchase:', error);
      }
    );
  }

  updateProduct(): void {
    this.stockService.updateProduct(this.productId, this.updateproductDetails).subscribe(
      (response) => {
        alert('Product updated successfully');
        console.log('Product updated successfully:', response);
      },
      (error) => {
        console.error('Error updating Product:', error);
      }
    );
  }
}
