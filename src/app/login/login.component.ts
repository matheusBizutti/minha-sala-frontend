import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ThfPageLoginLiterals } from '@totvs/thf-ui/components/thf-page';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customLiterals: ThfPageLoginLiterals = {
    title: 'Seja bem-vindo ao Minha sala',
    loginErrorPattern: 'Login obrigatório',
    loginPlaceholder: 'Insira seu usuário de acesso',
    passwordErrorPattern: 'Senha obrigatória',
    passwordPlaceholder: 'Insira sua senha de acesso',
    rememberUser: 'Lembrar usuário',
    submitLabel: 'Acessar sistema',
    forgotPassword: 'Esqueceu sua senha?'
  };

  constructor(private router: Router) { }

  ngOnInit() {}

  loginMock() {

    localStorage.setItem('teste', 'logged');
    this.router.navigate(['tocai/payments']);

  }

}
