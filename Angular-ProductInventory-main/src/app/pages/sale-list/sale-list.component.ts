import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StockInventoryService } from '../../services/stock-inventory.service'; 

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {
  saleList: any[] = [];

  constructor(
    private stockService: StockInventoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this.stockService.getAllSales().subscribe(
      (response) => {
        this.saleList = response.data;
      },
      (error) => {
        console.error('Error fetching sales:', error);
      }
    );
  }

  openUpdateForm(id: number) {
    this.router.navigate(['update-sale', id]);
  }
}
