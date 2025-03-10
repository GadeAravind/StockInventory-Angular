import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { StockInventoryService } from 'src/app/services/stock-inventory.service';

@Component({
  selector: 'app-update-sale',
  templateUrl: './update-sale.component.html',
  styleUrls: ['./update-sale.component.css']
})
export class UpdateSaleComponent implements OnInit{
  saleDetails: any = {}; 
  saleId!: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private stockService: StockInventoryService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.saleId = this.route.snapshot.params['id'];
    this.getSaleId(this.saleId);
  }

  getSaleId(saleId: number): void {
    this.stockService.getSaleById(saleId).subscribe(
      (data) => {
        this.saleDetails = data.data;
        this.saleDetails.saleDate = this.datePipe.transform(this.saleDetails.saleDate, 'yyyy-MM-dd'); 
        console.log(data);
      },
      (error) => {
        console.error('Error fetching sale:', error);
      }
    );
  }

  updateSale(): void {
    this.stockService.updateSale(this.saleId, this.saleDetails).subscribe(
      (response) => {
        alert(response.message);
        console.log('Sale updated successfully:', response);
      },
      (error) => {
        console.error('Error updating sale:', error);
      }
    );
  }
}
