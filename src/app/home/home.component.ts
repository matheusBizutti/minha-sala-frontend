import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ThfMenuItem } from '@totvs/thf-ui/components/thf-menu';
import { ThfToolbarAction, ThfToolbarProfile } from '@totvs/thf-ui/components/thf-toolbar';
import { AuthService } from '../auth/auth.service';

// import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filter = true;

  items: Array<ThfMenuItem> = [
    { label: 'Pagamentos', link: './users', icon: 'user', shortLabel: 'Pagtos' },
    { label: 'Eventos', link: '', icon: 'world', shortLabel: 'Eventos' },
    { label: 'Perfil', link: '', icon: 'calendar', shortLabel: 'Perfil' }
  ];

  public readonly profile: ThfToolbarProfile = {
    title: this.authService.getUsername()
  };

  public readonly profileActions: Array<ThfToolbarAction> = [
    { icon: 'thf-icon-exit', label: 'Sair', type: 'danger', separator: true, action: () => this.exit() }
  ];

  constructor(private route: Router, private authService: AuthService) {}

  ngOnInit() {}

  exit() {
    this.authService.clear();
    this.route.navigate(['/login']);
  }

}
