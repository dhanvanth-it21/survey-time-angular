import { Component } from '@angular/core';
import { faClipboardList, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { NavigationStart, Router, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  public faClipboardList: IconDefinition = faClipboardList;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  // handling the current user
  firstLetterOfEmailId?: string;
  public loggedUser: string | null = null;
  public isUserLoggedIn: boolean = false;


  //dynamic content on the navbar 
  public currentUrl: string = '/';

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
    this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if (event instanceof NavigationStart) {
            this.currentUrl = event.url;
            console.log(event)
          }
        });
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

  ngOnDestroy() {
    this.authService.logedUserSubject$.unsubscribe();
  }

}
