import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb';
import { ThfModalAction } from '@totvs/thf-ui/components/thf-modal';
import { ThfModalComponent } from '@totvs/thf-ui/components/thf-modal/thf-modal.component';
import { ThfSelectOption } from '@totvs/thf-ui/components/thf-field';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfPageAction } from '@totvs/thf-ui/components/thf-page';

import { AuthService } from '../auth/auth.service';
import { MeetingsRoomService } from './meetings-room.service';
import { MetricsService } from '../metrics/metrics.service';

@Component({
  selector: 'app-meetings-room',
  templateUrl: './meetings-room.component.html',
  styleUrls: ['./meetings-room.component.css']
})
export class MeetingsRoomComponent implements OnInit, OnDestroy {

  @ViewChild('modalDelete') modalDelete: ThfModalComponent;
  @ViewChild('modalEdit') modalEdit: ThfModalComponent;

  private subscription: Subscription;
  private subscriptionDelete: Subscription;
  private subscriptionEdit: Subscription;
  private subscriptionMetrics: Subscription;

  allMeetingsRoom: Array<Object> = [];
  datashow;
  meeting: Array<Object>;
  meetingRoomEdit: Array<Object> = [{
    name: undefined,
    capacity: undefined,
    datashow: undefined,
    description: undefined
  }];
  meetingsRoomOpen: Array<Object> = [];
  meetingsRoomBusy: Array<Object> = [];

  public readonly actions: Array<ThfPageAction> = [
    { label: 'Nova sala', action: this.navigateToNewRoom,  icon: 'thf-icon-plus' },
  ];

  public readonly breadcrumb: ThfBreadcrumb = {
    items: [
      { label: 'Início', link: '/schedule-list' },
      { label: 'Salas' }
    ]
  };

  editMeetingRoom: ThfModalAction = {
    action: () => {
      this.confirmEdit();
    },
    label: 'Confirmar'
  };

  options: Array<ThfSelectOption> = [
    { value: 'true', label: 'Sim' },
    { value: 'false', label: 'Não' }
  ];

  constructor(private meetingsRoomService: MeetingsRoomService,
              private thfNotification: ThfNotificationService,
              private router: Router,
              private metricsService: MetricsService,
              private authService: AuthService) {}

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

    this.meetingsRoomService.getMeetings().subscribe(response => {
      const meetingsStatusOpen = response.filter(this.filterStatusOpen);
      const meetingsStatusBusy = response.filter(this.filterStatusBusy);

      const body = {
        name: 'meetings',
        api: '/list',
        httpStatusCode: '200',
        user: this.authService.getUsername()
      };

      this.subscriptionMetrics = this.metricsService.create(body).subscribe(res => {
        console.log('métrica criada.');
      });

      this.allMeetingsRoom = [...response];
      this.meetingsRoomOpen = [...meetingsStatusOpen];
      this.meetingsRoomBusy = [...meetingsStatusBusy];
    });

  }

  confirmEdit() {

    this.meetingRoomEdit['datashow'] = this.datashow && this.datashow === 'true' ? true : false;

    const body = this.meetingRoomEdit;
    const roomId = this.meetingRoomEdit['_id'];

    this.subscriptionEdit = this.meetingsRoomService.updateMeetingRoom(body, roomId).subscribe(response => {
      const SUCCESS_MESSAGE = 'Alterações salvas com sucesso.';
      this.thfNotification.success(SUCCESS_MESSAGE);
      this.modalEdit.close();
    }, err => {
      this.thfNotification.error(err);
    });

  }

  deleteMeetingRoom() {
    const roomId = this.meetingRoomEdit['_id'];

    this.subscriptionDelete = this.meetingsRoomService.deleteMeetingRoom(roomId).subscribe(response => {
      this.thfNotification.success('Sala excluida com sucesso.');
      this.modalDelete.close();
    }, err => {
      this.thfNotification.error('Não foi possível excluir essa sala.');
    });

  }

  filterStatusOpen(obj) {
    if (obj.status === 'open') {
      return true;
    } else {
      return false;
    }
  }

  filterStatusBusy(obj) {
    if (obj.status === 'busy') {
      return true;
    } else {
      return false;
    }
  }

  openModal(meeting = [{}], isDelete?) {

    this.meetingRoomEdit = meeting;
    this.datashow = this.meetingRoomEdit['datashow'] ? 'true' : 'false';
    isDelete ? this.modalDelete.open() : this.modalEdit.open();

  }

  navigateToNewRoom() {
    this.router.navigate(['/meetings-room-create']);
  }

}
