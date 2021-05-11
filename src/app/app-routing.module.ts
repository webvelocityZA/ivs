import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { ThankYouFeebackComponent } from './pages/thank-you-feeback/thank-you-feeback.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterNewPatientComponent} from './pages/register-new-patient/register-new-patient.component';
import {VaccinationHistoryComponent} from './pages/vaccination-history/vaccination-history.component';
import {AdminProfileComponent} from './pages/admin-profile/admin-profile.component';
import {LandingComponent} from './pages/landing/landing.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './auth.guard';
import {FeedbackComponent} from './pages/feedback/feedback.component';
import {SelfRegisterComponent} from './pages/self-register/self-register.component';
import {ThankYouComponent} from './pages/thank-you/thank-you.component';
import {MemberProfileComponent} from './pages/member-profile/member-profile.component';
import {InoculateComponent} from './pages/inoculate/inoculate.component';
import {ThankYouInoculationComponent} from './pages/thank-you-inoculation/thank-you-inoculation.component';
import { MemberProfileEditComponent } from './pages/member-profile-edit/member-profile-edit.component';
import { OtpComponent } from './pages/otp/otp.component';
import { OtpUserCheckComponent } from './pages/otp-user-check/otp-user-check.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: ':query',
        component: MemberProfileComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterNewPatientComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'self-register',
    component: SelfRegisterComponent
  },
  {
    path: 'inoculate/:memberId/:idNumber',
    component: InoculateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vaccination-history',
    component: VaccinationHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'member-profile/:query',
    component: MemberProfileComponent
  },
  {
    path: 'member-profile-edit/:idNumber',
    component: MemberProfileEditComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: 'thank-you-feedback',
    component: ThankYouFeebackComponent
  },
  {
    path: 'otp-authentication/:idNumber',
    component: OtpComponent
  },
  {
    path: 'otp-user-check/:idNumber',
    component: OtpUserCheckComponent
  },
  {
    path: 'thank-you',
    component: ThankYouComponent
  },
  {
    path: 'thank-you-inoculation',
    component: ThankYouInoculationComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
