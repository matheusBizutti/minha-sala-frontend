import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb';
import { ThfDialogService } from '@totvs/thf-ui/services/thf-dialog/thf-dialog.service';
import { ThfModalAction } from '@totvs/thf-ui/components/thf-modal';
import { ThfModalComponent } from '@totvs/thf-ui/components/thf-modal/thf-modal.component';
import { ThfMultiselectOption } from '@totvs/thf-ui/components/thf-field';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfPageAction } from '@totvs/thf-ui/components/thf-page';

import { MeetingsRoomService } from './meetings-room.service';

@Component({
  selector: 'app-meetings-room',
  templateUrl: './meetings-room.component.html',
  styleUrls: ['./meetings-room.component.css']
})
export class MeetingsRoomComponent implements OnInit, OnDestroy {

  @ViewChild('modalDelete') modalDelete: ThfModalComponent;
  @ViewChild('modalEdit') modalEdit: ThfModalComponent;

  private subscriptionBusy: Subscription;
  private subscriptionDelete: Subscription;
  private subscriptionEdit: Subscription;
  private subscriptionOpen: Subscription;

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
    { label: 'Nova sala', action: null, icon: 'thf-icon-plus' },
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

  options: Array<ThfMultiselectOption> = [
    { value: 'true', label: 'Sim' },
    { value: 'false', label: 'Não' }
  ];

  constructor(private meetingsRoomService: MeetingsRoomService,
              private thfNotification: ThfNotificationService,
              private thfDialog: ThfDialogService) {

    this.subscriptionOpen = this.meetingsRoomService.getMeetingsRoomOpen().subscribe(response => {
      this.meetingsRoomOpen = [...response];
    });

    this.subscriptionBusy = this.meetingsRoomService.getMeetingsRoomBusy().subscribe(response => {
      this.meetingsRoomBusy = [...response];
      this.allMeetingsRoom = [...this.meetingsRoomOpen, ...this.meetingsRoomBusy];
    });

   }

  ngOnDestroy() {

    if (this.subscriptionBusy) {
      this.subscriptionBusy.unsubscribe();
    }

    if (this.subscriptionOpen) {
      this.subscriptionOpen.unsubscribe();
    }

    if (this.subscriptionEdit) {
      this.subscriptionEdit.unsubscribe();
    }

    if (this.subscriptionDelete) {
      this.subscriptionDelete.unsubscribe();
    }

  }

  ngOnInit() {}

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

  openModal(meeting = [{}], isDelete?) {

    this.meetingRoomEdit = meeting;
    this.datashow = this.meetingRoomEdit['datashow'] ? 'true' : 'false';
    isDelete ? this.modalDelete.open() : this.modalEdit.open();

  }

}
