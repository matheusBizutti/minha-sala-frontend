import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfSelectOption } from '@totvs/thf-ui/components/thf-field';

import { MeetingsRoomCreateService } from './meetings-room-create.service';

@Component({
  selector: 'app-meetings-room-create',
  templateUrl: './meetings-room-create.component.html',
  styleUrls: ['./meetings-room-create.component.css']
})
export class MeetingsRoomCreateComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

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
              private router: Router) {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {}

  save() {

    this.newRoom.datashow = this.datashow && this.datashow === 'true' ? true : false;
    this.newRoom.status = this.status;

    const body = this.newRoom;

    this.subscription = this.meetingsRoomCreateService.create(body).subscribe(response => {

      this.thfNotification.success('Nova sala cadastrada com sucesso.');
      this.router.navigate(['/meetings-room']);

    }, err => {
      this.thfNotification.error('Não foi possível concluir o cadastro.');
    });
  }

}
