import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  title = 'User Edit';
  user: User = null;
  userId: number = 0;
  submitBtnTitle = 'Save';

  constructor(
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute
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

  save() {
    // save the user to the DB
    this.userSvc.update(this.user).subscribe(
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


