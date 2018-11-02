import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ThfMenuItem } from '@totvs/thf-ui/components/thf-menu';
import { ThfToolbarAction, ThfToolbarProfile } from '@totvs/thf-ui/components/thf-toolbar';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filter = true;

  items: Array<ThfMenuItem> = [
    { label: 'Salas', link: '/meetings-room', icon: 'device-desktop', shortLabel: 'Salas' },
    { label: 'Agendamentos', icon: 'calendar-ok', link: '/schedule-request', shortLabel: 'Agend.' },
    { label: 'Métricas', link: '', icon: 'chart-area', shortLabel: 'Métricas' },
    { label: 'Dashboard', link: '/schedule-list', icon: 'chart-area', shortLabel: 'Dashboard' }
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
