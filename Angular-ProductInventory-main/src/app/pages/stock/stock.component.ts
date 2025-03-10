import { Component, OnInit } from '@angular/core';
import { StockInventoryService } from 'src/app/services/stock-inventory.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stockList: any[] = [];

  constructor(private stockService: StockInventoryService) {}

  ngOnInit(): void {
    this.getStock();
  }

  getStock() {
    this.stockService.getAllStock().subscribe(
      (response) => {
        this.stockList = response.data;
      },
      (error) => {
        console.error('Error fetching stock:', error);
      }
    );
  }
}
