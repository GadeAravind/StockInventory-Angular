import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StockInventoryService } from 'src/app/services/stock-inventory.service';

@Component({
  selector: 'app-update-purchase',
  templateUrl: './update-purchase.component.html',
  styleUrls: ['./update-purchase.component.css']
})
export class UpdatePurchaseComponent implements OnInit {
  purchaseDetails: any = {};
  purchaseId!: number;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockInventoryService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.purchaseId = this.route.snapshot.params['id'];
    this.getPurchaseById(this.purchaseId);
  }

  getPurchaseById(purchaseId: number): void {
    this.stockService.getPurchaseById(purchaseId).subscribe(
      (data) => {
        this.purchaseDetails = data.data;
        this.purchaseDetails.purchaseDate = this.datePipe.transform(this.purchaseDetails.purchaseDate, 'yyyy-MM-dd');
        console.log(data);
      },
      (error) => {
        console.error('Error fetching purchase:', error);
      }
    );
  }

  updatePurchase(): void {
    this.stockService.updatePurchase(this.purchaseId, this.purchaseDetails).subscribe(
      (response) => {
        if(response.result)
        {
          alert('Purchase updated successfully');
          console.log('Purchase updated successfully:', response);
        }
        else{
          alert('Purchase Cannot be edited below Sale Quantity after Sale Done');
        }
      },
      (error) => {
        console.error('Error updating purchase:', error);
      }
    );
  }
}
