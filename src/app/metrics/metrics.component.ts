import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';

import { MetricsService } from './metrics.service';
import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  columns = this.getColumns();
  metrics: Array<Object> = [];

  public readonly breadcrumb: ThfBreadcrumb = {
    items: [
      { label: 'Home', link: '/schedule-list' },
      { label: 'Métricas' }
    ]
  };

  constructor(private metricsService: MetricsService) { }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.metricsService.getMetrics().subscribe(response => {
      this.metrics = [...response];
    });
  }

  getColumns(): Array<ThfTableColumn> {
    return [
      { column: 'name', label: 'Nome'},
      { column: 'api', label: 'Endpoint' },
      { column: 'httpStatusCode', label: 'Status', type: 'label', labels: [
        { value: '200', color: 'success', label: 'Sucesso' },
        { value: '409', color: 'warning', label: 'Dado existente na base' },
        { value: '500', color: 'danger', label: 'Erro interno' }
      ]},
      { column: 'user', label: 'Usuário' },
    ];
  }

}
