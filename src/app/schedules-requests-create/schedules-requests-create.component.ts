import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfSelectOption } from '@totvs/thf-ui/components/thf-field';

import { SchedulesRequestsCreateService } from './schedules-requests-create.service';
import { AuthService } from '../auth/auth.service';
import { MetricsService } from '../metrics/metrics.service';

@Component({
  selector: 'app-schedules-requests-create',
  templateUrl: './schedules-requests-create.component.html',
  styleUrls: ['./schedules-requests-create.component.css']
})
export class SchedulesRequestsCreateComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private subscriptionMeetingsRoom: Subscription;
  private subscriptionMetrics: Subscription;

  meetingsRoom: Array<Object> = [];
  newScheduleRequest = {
    title: undefined,
    roomId: undefined,
    scheduleTime: undefined,
    scheduleHourInit: undefined,
    scheduleHourEnd: undefined,
    userEmail: undefined,
    department: undefined,
    status: undefined
  };

  optionsMeetingsRoom: Array<ThfSelectOption> = [
    { value: '5bd925afc63d48147d048aed', label: 'Sim' },
    { value: '5bd925afc63d48147d048aedd', label: 'Não' }
  ];

  public readonly breadcrumb: ThfBreadcrumb = {
    items: [
      { label: 'Agendamentos', link: '/schedule-request' },
      { label: 'Novo usuário' }
    ]
  };

  constructor(private scheduleRequestsCreateService: SchedulesRequestsCreateService,
              private thfNotification: ThfNotificationService,
              private router: Router,
              private authService: AuthService,
              private metricsService: MetricsService) { }

  ngOnDestroy() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscriptionMeetingsRoom) {
      this.subscriptionMeetingsRoom.unsubscribe();
    }

  }

  ngOnInit() {

    this.subscriptionMeetingsRoom = this.scheduleRequestsCreateService.getMeetings().subscribe(response => {
      const getMeetingsRoom = meeting => ({ value: meeting._id, label: meeting.name });
      this.meetingsRoom = response.map(getMeetingsRoom);
    });

  }

  save() {

    this.newScheduleRequest['scheduleTime'] = this.formatDateToAmericanPattern(this.newScheduleRequest['scheduleTime']);
    this.newScheduleRequest['scheduleHourInit'] = this.sendHourFormat(this.newScheduleRequest['scheduleHourInit']);
    this.newScheduleRequest['scheduleHourEnd'] = this.sendHourFormat(this.newScheduleRequest['scheduleHourEnd']);

    const body = this.newScheduleRequest;

    this.subscription = this.scheduleRequestsCreateService.create(body).subscribe(response => {

      this.thfNotification.success('Novo agendamento cadastrado com sucesso.');

      const metrics = {
        name: 'schedule-request',
        api: '/create',
        httpStatusCode: '200',
        user: this.authService.getUsername()
      };

      this.subscriptionMetrics = this.metricsService.create(metrics).subscribe(res => {
        console.log('métrica criada.');
      });

      this.router.navigate(['/schedule-request']);

    }, err => {
      if (err.status === 409) {

        const metrics = {
          name: 'schedule-request',
          api: '/create',
          httpStatusCode: err.status,
          user: this.authService.getUsername()
        };

        this.subscriptionMetrics = this.metricsService.create(metrics).subscribe(res => {
          console.log('métrica criada.');
        });

        this.thfNotification.error('Já existe um agendamento para essa sala nessa data e hora.');
      } else {
        this.thfNotification.error('Não foi possível concluir o cadastro.');
      }
    });
  }

  formatDateToAmericanPattern(date = '') {

    if (date.length) {
      const year = date.substr(0, 4);
      const month = date.substr(5, 2);
      const day = date.substr(8, 2);

      return year + month + day;
    }

    return date;

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
