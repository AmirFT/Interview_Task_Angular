import { Component } from '@angular/core';
// import { CoreService } from 'src/app/services/core.service';
import { RouterModule, Router } from '@angular/router';
// import { LoginService } from '../../../login.service';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { CoreService } from 'app/services/core.service';
import { LoginService } from 'app/login.service';
import { AuthService } from '@core/services/auth.service';
import { TokenStoreService } from '@core/services/token-store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IAuthLogIn } from '@core/models/credentials';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  options = this.settings.getOptions();

  username = new FormControl('info@Fathi.com', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]);
  password = new FormControl('123456', [Validators.required]);

  form = new FormGroup({
    username: this.username,
    password: this.password,
  });
  isSending = false
  constructor(
    private settings: CoreService,
    private tokenStoreService: TokenStoreService,
    private authService: AuthService,
    private routes: Router
  ) { }

  login() {
    // if (this.password.valid && this.username.valid) {
      this.isSending = true;

      this.tokenStoreService.storeLoginSession({ "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBFNUQ0QkYwNDYzNDFBMzMzRDlCRUJFRUNENjQxQzk3IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL215LnNoYXJqYm9vay5jb20iLCJuYmYiOjE3MTk2OTYwMDUsImlhdCI6MTcxOTY5NjAwNSwiZXhwIjoxNzE5Njk5NjA1LCJhdWQiOiJzaGFyamJvb2siLCJzY29wZSI6WyJzaGFyamJvb2siLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl0sImNsaWVudF9pZCI6InNoYXJqYm9vay53ZWIiLCJzdWIiOiJkZDllMzk1My0xYWRlLTQ1ZTAtOTQ5Zi04M2NiMjAyOTg2ZDgiLCJhdXRoX3RpbWUiOjE3MTg4MzEzNjcsImlkcCI6ImxvY2FsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiMDkyMDMxMzc3MDciLCJwaG9uZV9udW1iZXIiOiIwOTIwMzEzNzcwNyIsInNpZCI6IjYxRjgyQzZCOUU2NTFEMzAxODhBNTIxRUYwRTFEOUM1IiwianRpIjoiMEYyMzQxNEY2ODdEODIwM0QyQ0MxNUFFQUQ1QTdGQUEifQ.JDlZKrU0GVsXCn72ZGS9CWEA-rPCP7_4NnWCzh4bhdXOqEtrcoopK2N_Qd3xVgfvRb53sPOTFkFdIXcBUMW-va3_8uADMovy7zuV2uOT4fotvedRru60hhC2KqgjFxsB5kChU0NMfoVbHge-rK9kMBaK4UW1PZ5MI9snJ10MWvXfqYh7ots9G5iqj71TDSoKtsziqi6l-jmi6HB9qC5mAkkOrufFOivrueLv8hC8zeaMM3Eevudv6g43M8PlByHxBty9KNu0-K07FZu0qJnDujmPo0t9vEOXLLWPHcLEpWpGK2BEUmWMaUA907cEyfahYU6Ans7W3oh4za9ilH1Dgg" });
      this.authService.goToHome();
    // }
  }


}
