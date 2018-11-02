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

  constructor(private scheduleService: ScheduleListService) {}

  ngOnDestroy() {

    if (this.subscriptionBusy) {
      this.subscriptionBusy.unsubscribe();
    }

    if (this.subscriptionOpen) {
      this.subscriptionOpen.unsubscribe();
    }

  }

  ngOnInit() {

    this.scheduleService.getMeetings().subscribe(response => {
      const meetingsStatusOpen = response.filter(this.filterStatusOpen);
      const meetingsStatusBusy = response.filter(this.filterStatusBusy);

      this.allMeetingsRoom = [...response];
      this.meetingsRoomOpen = [...meetingsStatusOpen];
      this.meetingsRoomBusy = [...meetingsStatusBusy];
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
