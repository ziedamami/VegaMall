import { Component, OnInit } from '@angular/core';
import { RoutesRecognized } from '@angular/router';
import { FonctionnaliteService } from 'app/service/fonctionnalite.service';
import { LoginService } from 'app/service/login.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    fils:RouteInfo[];
    checkfils:boolean;
  }
export const ROUTES: RouteInfo[] = [
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: LoginService, private service:FonctionnaliteService) { }

  ngOnInit() {
  this.service.getFontionnalite().subscribe((par :any) => {
    par.providerInfo.filter(x=>{
        
      this.menuItems.push({ sectionpere :"#"+x.id ,id : x.id ,path : x.url, title: x.libelle,  icon: x.icon, class: '' , fpere : x.fpere , filsexist : x.filsexist});

    });
//    this.menuItems=par.result;
  })
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
 
  
}
