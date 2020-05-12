import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { location } from '../shared/other/location';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loc: string;

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

  search(searchForm: NgForm) {
    if (searchForm.invalid) {
      return;
    }
    this.store.dispatch({ type: location, payload: this.loc });
  }
}

