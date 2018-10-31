import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb';
import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';

import { ScheduleListService } from './schedule-list.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit, OnDestroy {

  private subscriptionBusy: Subscription;
  private subscriptionOpen: Subscription;

  columns = this.getColumns();

  allMeetingsRoom: Array<Object> = [];
  meetingsRoomOpen: Array<Object> = [];
  meetingsRoomBusy: Array<Object> = [];

  public readonly breadcrumb: ThfBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Dashboard' }
    ]
  };

  constructor(private scheduleService: ScheduleListService) {

    this.subscriptionOpen = this.scheduleService.getMeetingsRoomOpen().subscribe(response => {
      this.meetingsRoomOpen = [...response];
    });

    this.subscriptionBusy = this.scheduleService.getMeetingsRoomBusy().subscribe(response => {
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

  }

  ngOnInit() {}

  getColumns(): Array<ThfTableColumn> {
    return [
      { column: 'name', label: 'Nome'},
      { column: 'capacity', label: 'Capacidade' },
      { column: 'status', label: 'Status', type: 'label', labels: [
        { value: 'open', color: 'success', label: 'Sem reservas' },
        { value: 'busy', color: 'danger', label: 'Possui reservas' }
      ]},
      { column: 'datashow', label: 'Datashow', type: 'boolean', boolean: {
        trueLabel: 'Sim', falseLabel: 'Não'
      }}
    ];
  }

}
