import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StockInventoryService } from '../../services/stock-inventory.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {
  purchaseList: any[] = [];

  constructor(
    private stockService: StockInventoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPurchase();
  }

  loadPurchase() {
    this.stockService.getAllPurchases().subscribe(
      (response) => {
        this.purchaseList = response.data;
      },
      (error) => {
        console.error('Error fetching purchases:', error);
      }
    );
  }

  openUpdateForm(id: number) {
    this.router.navigate(['update-purchase', id]);
  }
}
