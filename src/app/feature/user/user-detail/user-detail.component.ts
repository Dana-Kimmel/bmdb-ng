import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  title: 'User Detail';
  user: User = null;
  userId: number = 0;
    
    constructor(
      private userSvc: UserService,
      private router: Router,
      private route: ActivatedRoute,
      private systemSvc: SystemService
    ) {}
  
    ngOnInit(): void {
      // get the id from the url
      this.route.params.subscribe((parms) => {
        this.userId = parms['id'];
      });
      // get user by id
      this.userSvc.getById(this.userId).subscribe(
        (resp) => {
          this.user = resp as User;
        },
        (err) => {
          console.log(err);
        }
      );
    }
    delete() {
      // delete the user
      this.userSvc.delete(this.user.id).subscribe(
        (resp) => {
          this.user = resp as User;
          // forward to the user list component
          this.router.navigateByUrl('/user-list');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }


