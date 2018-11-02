import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth-guard/auth-guard.service';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'schedule-list',
        loadChildren: './schedule-list/schedule-list.module#ScheduleListModule'
      },
      { path: 'meetings-room',
        loadChildren: './meetings-room/meetings-room.module#MeetingsRoomModule'
      },
      { path: 'meetings-room-create',
        loadChildren: './meetings-room-create/meetings-room-create.module#MeetingsRoomCreateModule'
      },
      { path: 'schedule-request',
        loadChildren: './schedules-requests/schedules-requests.module#SchedulesRequestsModule'
      },
      {
        path: 'schedule-request-create',
        loadChildren: './schedules-requests-create/schedules-requests-create.module#ScheduleRequestsCreateModule'
      },
      {
        path: 'metrics',
        loadChildren: './metrics/metrics.module#MetricsModule'
      }
    ]
  },
  { path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  { path: 'signup',
    loadChildren: './signup/signup.module#SignupModule'
  },
  { path: 'change-password',
    loadChildren: './change-password/change-password.module#ChangePasswordModule'
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
