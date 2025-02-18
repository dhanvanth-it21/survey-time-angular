import { Component } from '@angular/core';
import { faClipboardList, faRightFromBracket, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../common/auth.service';
import { NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { DataSharingService } from '../common/data-sharing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  //font awesome icons
  public faClipboardList: IconDefinition = faClipboardList;
  public faSignOut: IconDefinition = faRightFromBracket;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataSharingService: DataSharingService,
  ) { }

  // handling the current user
  firstLetterOfEmailId?: string;
  public loggedUser: string | null = null;
  public isUserLoggedIn?: boolean;


  //dynamic content on the navbar 
  dynamicContent: {label: string, routeUrl: string}[] = [];

  ngOnInit() {

    // subcribe to the loggged user information
    this.authService.logedUserSubject$.subscribe((user) => {
      if (user !== null) {
        this.loggedUser = JSON.stringify(user);
        this.isUserLoggedIn = this.isLoggedIn();
      }
      else {
        this.loggedUser = null;
        this.isUserLoggedIn = false;
      }
    })

    //dynamic content on the navbar 
    //according to the landing page
    this.dataSharingService.shareData$.subscribe((datas: string[]) => {
      this.dynamicContent = this.parseDynamicContent(datas);
    })
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

  ngOnDestroy() {
    this.authService.logedUserSubject$.unsubscribe();
  }

}
