import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';

import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  user = {
    username: undefined,
    name: undefined,
    password: undefined,
    confirmPassword: undefined
  };

  public readonly breadcrumb: ThfBreadcrumb = {
    items: [
      { label: 'Login', link: '/' },
      { label: 'Novo usuário' }
    ]
  };

  constructor(private signupService: SignupService,
              private thfNotification: ThfNotificationService,
              private router: Router) { }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() { }

  signUp() {

    const FAILED = 'Não foi possível efetuar o cadastro.';
    const SUCCESS = 'Cadastro efetuado com sucesso.';

    const body = {
      username: this.user.username,
      name: this.user.name,
      password: this.user.password,
      confirmpassword: this.user.confirmPassword
    };

    this.subscription = this.signupService.signUp(body).subscribe(response => {
      this.thfNotification.success(SUCCESS);
      this.router.navigate(['/login']);
    }, err => {
      this.thfNotification.error(FAILED);
    });

  }

}
