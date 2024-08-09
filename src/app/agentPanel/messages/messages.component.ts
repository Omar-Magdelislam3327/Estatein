import { Component } from '@angular/core';
import { AgentNavComponent } from '../../userPanel/shared/agent-nav/agent-nav.component';
import { MessagesapiService } from '../../services/messagesapi.service';
import { Meessages } from '../../modules/Messages';
import { UsersapiService } from '../../services/usersapi.service';
import { User } from '../../modules/Properties';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    AgentNavComponent
  ],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages!: Meessages[];
  user!: User | null;

  constructor(
    private api: MessagesapiService,
    private userApi: UsersapiService,
    private router: Router
  ) {
    const loggedInAgent = JSON.parse(localStorage.getItem("agent") || "null");
    if (!loggedInAgent) {
      this.router.navigate(['/']);
    } else {
      this.user = loggedInAgent;

      // Fetch user data if needed
      this.userApi.get().subscribe((res: any) => {
        this.user = res;
        console.log(res);
        // this.loadMessages(); // Load messages after user data is fetched
      });
    }
  }

  // loadMessages() {
  //   if (this.user && this.user.id) {
  //     this.api.get().subscribe((data: Meessages[]) => {
  //       this.messages = data.filter((message: Meessages) => message.to === this.user.id); // Use the non-null assertion operator
  //       console.log(this.messages);
  //     });
  //   }
  // }
}
