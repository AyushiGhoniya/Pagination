import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  public employees = [];
  page: number;
  pageSize : number;
  collectionSize : number;

  sortClass = 'up'
  orderBy = 'asc'
  sortBy = 'id';

  constructor(private employeeService: EmployeeService ,private activatedRoute: ActivatedRoute ,private router: Router ,private http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.collectionSize = 24;
      this.page = parseInt(params['page']);
      this.pageSize = parseInt(params['limit']);
      if(isNaN(this.page) || isNaN(this.pageSize)) {
        this.page = 1;
        this.pageSize = 5;
        this.router.navigate(['/employee'], { queryParams: { page: this.page, limit: this.pageSize }})
      }
      this.employeeService.getEmployees(this.page ,this.sortBy ,this.pageSize)
        .subscribe(data => this.employees = data);
    })
  }

  sort(property) {
    this.employeeService.getEmployees(this.page ,this.sortBy ,this.pageSize).subscribe(data => {
      this.employees = data
    });
    this.pageChange()
  }

  pageChange() {
      this.router.navigate(['/employee'], { queryParams: { page: this.page, limit: this.pageSize }})
  }

  // sort(property) {
  //   this.employees.sort((a, b) => {
  //     if(property == 'employee_name'){
  //       if (a[property] < b[property]) {
  //         return -1;
  //       }
  //       else {
  //         return 0;
  //       }
  //     } else {
  //       if (parseInt(a[property]) < parseInt(b[property])) {
  //         return -1;
  //       }
  //       else {
  //         return 0;
  //       }
  //     }
  //   }); 
  // }

  
}
