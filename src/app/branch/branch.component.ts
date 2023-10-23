import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/core/models/branch.model';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
})
export class BranchComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  branches: Branch[] = []; //branşları depolamak için bir dizi

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.apiService.getAllEntities(Branch).subscribe((response) => {
      this.branches = response.data; 

    //   // Büyük harf yapma işlemi
    //   this.branches = this.branches.map((branch) => {
    //     return {
    //       ...branch,
    //       BranchName:
    //         branch.BranchName.charAt(0).toLocaleUpperCase('tr') +
    //         branch.BranchName.slice(1),
    //   };
    // });
    
    console.log(this.branches);

    });
 }
}
