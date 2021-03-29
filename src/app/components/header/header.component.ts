import { LoginService } from './../../login/login.service';
import { LoginErrorStateMatcher } from './LoginErrorStateMatcher';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { UserDetails } from '../../login/login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private loginService: LoginService,
    private router: Router) { }
    isInvalidUser = false;
    active =1;
  closeResult = '';
  matcher = new LoginErrorStateMatcher();
  loginForm = new FormGroup({
    userid : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
  }
  open(content: any): void{
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  loginUser(): void{
    let privateUserArr = [];
    this.isInvalidUser = false;
    this.loginService.getPrivateUsers().subscribe((userData: Array<UserDetails>) => {
      privateUserArr = userData;
      const isPrivateUser = privateUserArr.findIndex(elem => {
        return elem.userid === this.loginForm.controls.userid.value &&
        elem.password === this.loginForm.controls.password.value;
      });
      if (isPrivateUser >= 0){
        const path = '';
        this.modalService.dismissAll();
        this.router.navigate(['gallery']);
      } else {
        this.isInvalidUser = true;
        this.loginForm.reset();
      }
    });
  }
}
