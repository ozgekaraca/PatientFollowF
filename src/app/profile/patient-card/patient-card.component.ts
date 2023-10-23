import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/core/models/patient.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss'],
})
export class PatientCardComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.showPatient();
  }

  patients: Patient[] = [];

  showPatient() {
    this.apiService.getAllEntities(Patient).subscribe((response) => {
      this.patients = response.data;
      console.log(response);
    });
  }

  deletePatient(id: number) {
    if (confirm('Reçeteyi silmek istediğinize emin misiniz?')) {
      this.apiService.deleteEntity(id, Patient).then((response: any) => {
        if (response.success) {
          this.patients = response.data;
        }
      });
    }
  }
}
