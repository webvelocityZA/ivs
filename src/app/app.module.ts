import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import { MatTreeModule } from '@angular/material/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterNewPatientComponent } from './pages/register-new-patient/register-new-patient.component';
import { VaccinationHistoryComponent } from './pages/vaccination-history/vaccination-history.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { IvsNavbarComponent } from './components/ivs-navbar/ivs-navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { IvsFooterComponent } from './components/ivs-footer/ivs-footer.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { SelfRegisterComponent } from './pages/self-register/self-register.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { MemberProfileComponent } from './pages/member-profile/member-profile.component';
import { InoculateComponent } from './pages/inoculate/inoculate.component';
import { CookieService } from 'ngx-cookie-service';
import { ThankYouInoculationComponent } from './pages/thank-you-inoculation/thank-you-inoculation.component';
import { IvsBackButtonComponent } from './components/ivs-back-button/ivs-back-button.component';
import { IvsHeadingComponent } from './components/ivs-heading/ivs-heading.component';
import { MemberProfileEditComponent } from './pages/member-profile-edit/member-profile-edit.component';
import { OtpComponent } from './pages/otp/otp.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterNewPatientComponent,
    VaccinationHistoryComponent,
    AdminProfileComponent,
    IvsNavbarComponent,
    LoginComponent,
    LandingComponent,
    IvsFooterComponent,
    FeedbackComponent,
    SelfRegisterComponent,
    HomeCardComponent,
    ThankYouComponent,
    MemberProfileComponent,
    InoculateComponent,
    ThankYouInoculationComponent,
    IvsBackButtonComponent,
    IvsHeadingComponent,
    MemberProfileEditComponent,
    OtpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatRadioModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
