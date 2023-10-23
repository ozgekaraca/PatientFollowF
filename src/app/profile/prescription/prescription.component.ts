import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prescription } from 'src/core/models/prescription.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss'],
})
export class PrescriptionComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.showPrescription();
  }

  prescriptions: Prescription[] = [];

  showPrescription() {
    this.apiService.getAllEntities(Prescription).subscribe((response) => {
      this.prescriptions = response.data;
      console.log(response);
    });
  }

  deletePrescription(id: number) {
    if (confirm('Reçeteyi silmek istediğinize emin misiniz?')) {
      this.apiService.deleteEntity(id, Prescription).then((response: any) => {
        if (response.success) {
          this.prescriptions = response.data;
          
        }
      });
    }
  }
}

