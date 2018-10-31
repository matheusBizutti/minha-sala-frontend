import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfPageLogin, ThfPageLoginLiterals } from '@totvs/thf-ui/components/thf-page';

import { AuthService } from '../auth/auth.service';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  customLiterals: ThfPageLoginLiterals = {
    title: 'Seja bem-vindo ao Minha sala',
    loginErrorPattern: 'Login obrigatório',
    loginPlaceholder: 'Insira seu usuário de acesso',
    passwordErrorPattern: 'Senha obrigatória',
    passwordPlaceholder: 'Insira sua senha de acesso',
    rememberUser: 'Lembrar usuário',
    submitLabel: 'Entrar',
    forgotPassword: 'Esqueceu sua senha?'
  };

  private subscription: Subscription;

  constructor(private router: Router,
              private loginService: LoginService,
              private authService: AuthService,
              private thfNotification: ThfNotificationService) { }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {}

  signIn(formData: ThfPageLogin) {

    const INVALID_ACCESS = 'Acesso inválido';

    const body = {
      username:  formData.login,
      password: formData.password
    };

    this.subscription = this.loginService.siginAuth(body).subscribe(response => {

      this.authService.setToken(response['token']);
      this.router.navigate(['schedule-list']);

    }, err => {
      this.thfNotification.error(INVALID_ACCESS);
    });

  }

}
