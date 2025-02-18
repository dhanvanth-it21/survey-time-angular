import { Component } from '@angular/core';
import { faClipboardList, faRightFromBracket, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../common/auth.service';
import { NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { DataSharingService } from '../common/data-sharing.service';
import { Subscription } from 'rxjs';
import { ClickEventService } from '../common/click-event.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  //font awesome icons
  public faClipboardList: IconDefinition = faClipboardList;
  public faSignOut: IconDefinition = faRightFromBracket;

  

  //subcribtions
  authServiceSubcription!: Subscription;
  dataSharingServiceSubcription!: Subscription;
  clickEventServiceSubcription!: Subscription;

  // handling the current user
  firstLetterOfEmailId?: string;
  public loggedUser: string | null = null;
  public isUserLoggedIn?: boolean;


  //dynamic content on the navbar 
  dynamicContent: { label: string, routeUrl: string }[] = [];


  constructor(
    private authService: AuthService,
    private router: Router,
    private dataSharingService: DataSharingService,
    private clcikEventService: ClickEventService,
  ) {
   }

  ngOnInit() {


    // subcribe to the loggged user information
    this.authServiceSubcription = this.authService.logedUserSubject$.subscribe((user) => {
      // (helper call) 
      this.profileView(user);
    })

    //dynamic content on the navbar 
    //according to the landing page
    this.dataSharingServiceSubcription = this.dataSharingService.shareData$.subscribe((datas: string[]) => {
      this.dynamicContent = this.parseDynamicContent(datas);
    });
  }

  // (helper)
  profileView(user: {'emailId': string, 'role': string} | null) {
    
    if (typeof window !== 'undefined') {
      if (user !== null) {
        this.loggedUser = JSON.stringify(user);
        this.isUserLoggedIn = this.isLoggedIn();
      }
      else {
        this.loggedUser = localStorage.getItem('loggedInUser');
        this.isUserLoggedIn = this.isLoggedIn();
      }
    }
  }


  //(helper) string to json for dynamic content
  parseDynamicContent(datas: string[]) {
    return this.dynamicContent = datas.map((data) => {
      return JSON.parse(data);
    })
  }

  // is logged in and getting first letter of email id
  isLoggedIn(): boolean {
    if (this.loggedUser !== null) {
      console.log('logged in');
      this.firstLetterOfEmailId = JSON.parse(this.loggedUser).emailId.charAt(0).toUpperCase();
      return true;
    }
    else {
      console.log('not logged in');
      return false;
    }
  }

  //logout of user and redirecting to the login page (home page)
  logoutUser(): void {
    this.authService.logout();
    this.router.navigate([''])
  }

  // notifying the click event on the button
  buttonClick(event: Event, button: { label: string, routeUrl: string }): void {
    event.preventDefault();
    this.clcikEventService.updateData(button.label);
    if (button.routeUrl) {
      this.router.navigate([button.routeUrl]);
    }
  }

  ngOnDestroy() {
    this.authServiceSubcription.unsubscribe();
    this.dataSharingServiceSubcription.unsubscribe();
  }

}
