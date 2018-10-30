import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ThfMenuItem } from '@totvs/thf-ui/components/thf-menu';
import { ThfToolbarAction, ThfToolbarProfile } from '@totvs/thf-ui/components/thf-toolbar';

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
    subtitle: 'subtitle teste',
    title: 'title teste'
  };

  public readonly profileActions: Array<ThfToolbarAction> = [
    { icon: 'thf-icon-exit', label: 'Sair', type: 'danger', separator: true, action: () => {/* call exit*/} }
  ];

  constructor(private route: Router) {}

  ngOnInit() {}

}
