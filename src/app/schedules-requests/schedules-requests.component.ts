import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


import { Subscription } from 'rxjs';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';

import { SchedulesRequestsService } from './schedules-requests.service';
import { ThfPageAction } from '@totvs/thf-ui/components/thf-page';
import { ThfModalComponent } from '@totvs/thf-ui/components/thf-modal';
import { AuthService } from '../auth/auth.service';
import { MetricsService } from '../metrics/metrics.service';

@Component({
  selector: 'app-schedules-requests',
  templateUrl: './schedules-requests.component.html',
  styleUrls: ['./schedules-requests.component.css']
})
export class SchedulesRequestsComponent implements OnInit, OnDestroy {

  @ViewChild('modalDelete') modalDelete: ThfModalComponent;
  @ViewChild('modalEdit') modalEdit: ThfModalComponent;

  private subscription: Subscription;
  private subscriptionEdit: Subscription;
  private subscriptionDelete: Subscription;
  private subscriptionMetrics: Subscription;

  schedulesRequests: Array<Object> = [];
  schedulesRequestsEdit: Array<Object> = [{
    title: undefined,
    scheduleTime: undefined,
    scheduleHourInit: undefined,
    scheduleHourEnd: undefined
  }];

  public readonly actions: Array<ThfPageAction> = [
    { label: 'Agendamento', action: this.navigateToNewSchedule,  icon: 'thf-icon-plus' },
  ];

  public readonly breadcrumb: ThfBreadcrumb = {
    items: [
      { label: 'Início', link: '/schedule-list' },
      { label: 'Agendamentos' }
    ]
  };

  constructor(private scheduleRequestsService: SchedulesRequestsService,
              private thfNotification: ThfNotificationService,
              private router: Router,
              private authService: AuthService,
              private metricsService: MetricsService) {}

  ngOnDestroy() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscriptionEdit) {
      this.subscriptionEdit.unsubscribe();
    }

    if (this.subscriptionDelete) {
      this.subscriptionDelete.unsubscribe();
    }

    if (this.subscriptionMetrics) {
      this.subscriptionMetrics.unsubscribe();
    }

  }

  ngOnInit() {

    this.subscription = this.scheduleRequestsService.getSchedulesRequests().subscribe(response => {
      this.schedulesRequests = [...response];

      const metrics = {
        name: 'schedule',
        api: '/list',
        httpStatusCode: '200',
        user: this.authService.getUsername()
      };

      this.subscriptionMetrics = this.metricsService.create(metrics).subscribe(res => {
        console.log('métrica criada.');
      });

    }, err => {

      const metrics = {
        name: 'schedule',
        api: '/list',
        httpStatusCode: err.status,
        user: this.authService.getUsername()
      };

      this.subscriptionMetrics = this.metricsService.create(metrics).subscribe(res => {
        console.log('métrica criada.');
      });

    });

  }

  confirmEdit() {

    this.schedulesRequestsEdit['scheduleHourInit'] = this.sendHourFormat(this.schedulesRequestsEdit['scheduleHourInit']);
    this.schedulesRequestsEdit['scheduleHourEnd'] = this.sendHourFormat(this.schedulesRequestsEdit['scheduleHourEnd']);

    const body = this.schedulesRequestsEdit;
    const scheduleId = this.schedulesRequestsEdit['_id'];

    this.subscriptionEdit = this.scheduleRequestsService.updateSchedulesRequests(body, scheduleId).subscribe(response => {
      const SUCCESS_MESSAGE = 'Alterações salvas com sucesso.';
      this.thfNotification.success(SUCCESS_MESSAGE);
      this.modalEdit.close();
    }, err => {
      this.thfNotification.error(err);
    });

  }

  deleteSchedulesRequest() {
    const scheduleId = this.schedulesRequestsEdit['_id'];

    this.subscriptionDelete = this.scheduleRequestsService.deleteSchedulesRequests(scheduleId).subscribe(response => {
      this.thfNotification.success('Agendamento excluido com sucesso.');
      this.modalDelete.close();
    }, err => {
      this.thfNotification.error('Não foi possível excluir esse agendamento.');
    });

  }

  navigateToNewSchedule() {
    this.router.navigate(['/schedule-request-create']);
  }

  openModal(schedule = [{}], isDelete?) {

    this.schedulesRequestsEdit = Object.assign({}, schedule);
    isDelete ? this.modalDelete.open() : this.modalEdit.open();

  }

  sendDateFormat(schedule) {
    const year = schedule['scheduleTime'].substr(0, 4);
    const month = schedule['scheduleTime'].substr(4, 2);
    const day = schedule['scheduleTime'].substr(6, 2);

    return day + '/' + month + '/' + year;
  }

  sendHourFormat(hour = '') {

    if (hour.length >= 3) {
      const minutes = hour.substr(0, 2);
      const seconds = hour.substr(2, 2);

      return minutes + ':' + seconds;
    } else {
      console.log('hour:', hour);
      return hour + ':00';
    }

  }

}
