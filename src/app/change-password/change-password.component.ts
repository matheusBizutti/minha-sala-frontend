import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';

import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  user = {
    username: undefined,
    password: undefined
  };

  public readonly breadcrumb: ThfBreadcrumb = {
    items: [
      { label: 'Login', link: '/' },
      { label: 'Novo usuário' }
    ]
  };

  constructor(private changePasswordService: ChangePasswordService,
              private router: Router,
              private thfNotification: ThfNotificationService) { }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {}

  changePassword() {

    const FAILED = 'Não foi possível alterar a senha.';
    const SUCCESS = 'Senha alterada com sucesso.';

    const body = {
      password: this.user.password,
    };

    const usernameParam = this.user.username;

    this.subscription = this.changePasswordService.changePassword(body, usernameParam).subscribe(response => {
      this.thfNotification.success(SUCCESS);
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
      this.thfNotification.error(FAILED);
    });

  }

}
