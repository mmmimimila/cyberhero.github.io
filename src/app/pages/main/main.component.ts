import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit{

  public userName = '';
  public image = '';
  constructor(
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getProfileInfo().subscribe((res: any)=>{
      console.log(res);
      this.userName = Object.values(res[0].name).join(' ');
      this.image = res[0].picture.large;
    })
  }
}
