import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StockInventoryService } from 'src/app/services/stock-inventory.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formSubmitted = false;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private stockService: StockInventoryService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      let loginData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.stockService.login(loginData).subscribe((res: any) => { 
        if (res.result) {
          alert("Login Successful");
          this.authService.setLoggedIn(true, res.message); 
          this.router.navigate(['/app-component']);
        } else {
          this.errorMessage=res.message;
        }
      });
    }
  }
}
