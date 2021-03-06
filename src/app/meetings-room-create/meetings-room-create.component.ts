import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfSelectOption } from '@totvs/thf-ui/components/thf-field';

import { MeetingsRoomCreateService } from './meetings-room-create.service';
import { AuthService } from '../auth/auth.service';
import { MetricsService } from '../metrics/metrics.service';

@Component({
  selector: 'app-meetings-room-create',
  templateUrl: './meetings-room-create.component.html',
  styleUrls: ['./meetings-room-create.component.css']
})
export class MeetingsRoomCreateComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private subscriptionMetrics: Subscription;

  datashow;
  newRoom = {
    name: undefined,
    capacity: undefined,
    status: undefined,
    datashow: undefined,
    description: undefined,
  };
  status;

  public readonly breadcrumb: ThfBreadcrumb = {
    items: [
      { label: 'Salas', link: '/meetings-room' },
      { label: 'Novo usuário' }
    ]
  };

  optionsDatashow: Array<ThfSelectOption> = [
    { value: 'true', label: 'Sim' },
    { value: 'false', label: 'Não' }
  ];

  optionsStatus: Array<ThfSelectOption> = [
    { value: 'open', label: 'Sem reservas' },
    { value: 'busy', label: 'Com reservas' }
  ];

  constructor(private meetingsRoomCreateService: MeetingsRoomCreateService,
              private thfNotification: ThfNotificationService,
              private router: Router,
              private authService: AuthService,
              private metricsService: MetricsService) {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscriptionMetrics) {
      this.subscriptionMetrics.unsubscribe();
    }
  }

  ngOnInit() {}

  save() {

    this.newRoom.datashow = this.datashow && this.datashow === 'true' ? true : false;
    this.newRoom.status = this.status;

    const body = this.newRoom;

    this.subscription = this.meetingsRoomCreateService.create(body).subscribe(response => {

      this.thfNotification.success('Nova sala cadastrada com sucesso.');

      const metrics = {
        name: 'meetings',
        api: '/create',
        httpStatusCode: '200',
        user: this.authService.getUsername()
      };

      this.subscriptionMetrics = this.metricsService.create(metrics).subscribe(res => {
        console.log('métrica criada.');
      });

      this.router.navigate(['/meetings-room']);

    }, err => {

      const metrics = {
        name: 'meetings',
        api: '/create',
        httpStatusCode: err.status,
        user: this.authService.getUsername()
      };

      this.subscriptionMetrics = this.metricsService.create(metrics).subscribe(res => {
        console.log('métrica criada.');
      });

      this.thfNotification.error('Não foi possível concluir o cadastro.');
    });
  }

}
