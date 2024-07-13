import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { validateBasis } from '@angular/flex-layout';
import { PgService } from 'src/app/services/pg.service';
interface Amenity {
  icon: string;
  title: string;
}

interface Rule {
  icon: string;
  title: string;
}
interface Room {
  id: number;
  occupancy: number;
  type: string;
  totalRooms: number;
  vacancies: number;
  rentPerMonth: number;
  deposit: number;
}
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class PropertyComponent {
  rooms: Room[] = [];
  roomIdCounter = 1;
  addRoom(): void {
    this.rooms.push({
      id: this.roomIdCounter++,
      occupancy: 0,
      type: '',
      totalRooms: 0,
      vacancies: 0,
      rentPerMonth: 0,
      deposit: 0
    });
    console.log(this.rooms);
  }
  deleteRoom(index: number): void {
    this.rooms.splice(index, 1);
  }
  amenitieslist: Amenity[] = [
    { icon: 'wifi', title: 'Free Wi-fi' },
    { icon: 'tv', title: 'Tv' },
    { icon: 'shower', title: 'Shower' },
    { icon: 'single_bed', title: 'Bedding' },
    { icon: 'water_drop', title: 'Clean Water' },
    { icon: 'local_laundry_service', title: 'Washing Machine' },
    { icon: 'countertops', title: 'Kitchen' },
    { icon: 'kitchen', title: 'Refrigerator' },
    { icon: 'microwave', title: 'Microwave' },
    { icon: 'cleaning_services', title: 'Daily Cleaning' },
    { icon: 'restaurant', title: 'Meals' }
  ];

  ruleslist: Rule[] = [
    { icon: 'smoke_free', title: 'No smoking' },
    { icon: 'no_drinks', title: 'No Drinking' },
    { icon: 'wc', title: 'No opposite gender' },
    { icon: 'pets', title: 'No pets' },
    { icon: 'campaign', title: 'No Loud Noise' },
    { icon: 'celebration', title: 'No parties' },
    { icon: 'group', title: 'No visitors' }
  ];

  addedAmenities: Amenity[] = [];
  addedRules: Rule[] = [];

  moveToNextStep(step: string) {
    document.getElementById(step)?.click();
  }
  imageurls: any;
  formdetails() {
    const formData: FormData = new FormData();
    this.uploadedFiles.forEach(file => {
      formData.append('files', file, file.name);
    });
    console.log(this.uploadedFiles);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    this.http.post('http://localhost:5000/upload/multiple', formData, { headers })
      .subscribe((response: any) => {
        // console.log('Upload response:', response);

        // console.log(response.files);
        // this.imageUrls = response.files;
        // this.propertyForm.controls.imageUrls.setValue(response.files.map((file: any) => file.downloadURL))
        // .map((file: any) => {
        //   file.downloadURL;
        // })
        this.imageurls = response.files.map((file: any) => file.downloadURL);
        this.nowsubmit();
        // this.propertyForm.addControl('imageUrls', response.files.map((file: any) => file.downloadURL));
      }, error => {
        console.error('Upload error:', error);
      });

    // console.log(this.propertyForm.controls.imageUrls);
    // console.log(this.propertyForm.value);

  }
  nowsubmit() {
    // console.log(this.propertyForm.controls.title.value);
    const title = this.propertyForm.controls.title.value;
    const address = this.propertyForm.controls.address.value;
    const about = this.propertyForm.controls.about.value;
    const city = this.propertyForm.controls.city.value;
    const pincode = this.propertyForm.controls.pincode.value;
    const ownername = this.propertyForm.controls.ownername.value;
    const ownercontact = this.propertyForm.controls.ownercontact.value;
    const owneremail = this.propertyForm.controls.owneremail.value;
    const addedRooms = this.propertyForm.controls.addedRooms.value;
    const addedAmenities = this.propertyForm.controls.addedAmenities.value;
    const addedRules = this.propertyForm.controls.addedRules.value;
    const images = this.imageurls;
    // console.log({ title, address, about, city, pincode, ownername, ownercontact, owneremail, addedRooms, addedAmenities, addedRules, images })
    // console.log(this.propertyForm.value);
    this.pgservice.addpg({
      title, address, about, city, pincode, ownercontact, owneremail, ownername, addedAmenities, addedRooms, addedRules, images
    }).subscribe({
      next: (res) => {
        console.log('Property addition successful:', res);
      },
      error: (err) => {
        console.error('Error adding property:', err);
      }
    });
    // console.log('Property addition successful:');
  }
  uploadForm: FormGroup;
  propertyForm !: FormGroup;
  uploadedFiles: File[] = [];
  imageUrls: any[] = [];
  constructor(private fb: FormBuilder, private http: HttpClient, private pgservice: PgService) {
    this.uploadForm = this.fb.group({
      files: ['']
    });
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      about: ['', Validators.required],
      ownername: ['', Validators.required],
      owneremail: ['', Validators.required],
      ownercontact: ['', Validators.required],
      addedAmenities: [this.addedAmenities, Validators.required],
      addedRules: [this.addedRules, Validators.required],
      // imageUrls: [[''], Validators.required],
      addedRooms: [this.rooms, Validators.required]
    })
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.uploadedFiles.push(files[0]);
    console.log(this.uploadedFiles);
  }

  getFileType(fileName: string): string {
    const extension = fileName.split('.').pop();
    if (extension) {
      return extension.toUpperCase();
    }
    return 'UNKNOWN';
  }

  removeFile(file: File): void {
    this.uploadedFiles = this.uploadedFiles.filter(f => f !== file);
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  uploadFiles(): void {

  }

  toggleAmenity(amenity: Amenity): void {
    const index = this.addedAmenities.findIndex(item => item.title === amenity.title);
    if (index > -1) {
      this.addedAmenities.splice(index, 1);
    } else {
      this.addedAmenities.push(amenity);
    }
  }

  toggleRule(rule: Rule): void {
    const index = this.addedRules.findIndex(item => item.title === rule.title);
    if (index > -1) {
      this.addedRules.splice(index, 1);
    } else {
      this.addedRules.push(rule);
    }
  }
}
