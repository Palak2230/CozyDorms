import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
// import { Rooms } from 'src/app/shared/models/rooms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PgService } from 'src/app/services/pg.service';
import { Rooms } from 'src/app/shared/models/rooms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { User } from 'src/app/shared/models/User';
interface Amenity {
  icon: string;
  title: string;
}

interface Rule {
  icon: string;
  title: string;
}

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    }, {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'warn' },
    }
  ],
})
export class PropertyComponent implements OnInit {
  // rooms: Rooms[] = [];
  roomIdCounter = 1;
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
  imageurls: any;
  uploadedFiles: File[] = [];
  imageUrls: any[] = [];
  // uploadForm: FormGroup;
  propertyForm !: FormGroup;
  user!: User;
  constructor(private fb: FormBuilder, private http: HttpClient, private pgservice: PgService) {
    // this.uploadForm = this.fb.group({
    //   files: ['']
    // });

    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      tenantgender: ['', Validators.required],
      about: ['', Validators.required],
      ownername: ['', Validators.required],
      owneremail: ['', [Validators.required, Validators.email]],
      ownercontact: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      addedAmenities: [this.addedAmenities],
      addedRules: [this.addedRules],
      roomsgroup: this.fb.array([]) // Initialize FormArray for rooms
    });
  }

  ngOnInit(): void {
    console.log(this.propertyForm.invalid);
    const item = localStorage.getItem('User');
    this.user = JSON.parse(item || '');
  }

  get roomsgroup(): FormArray {
    // return this.propertyForm.get('roomsgroup') as FormArray;
    return this.propertyForm.controls["roomsgroup"] as FormArray;
  }
  // get roomsform(): FormGroup {
  //   return this.roomsgroup
  // }
  addRoom(): void {
    const roomGroup = this.fb.group({
      occupancy: [0, Validators.required],
      type: ['AC', Validators.required],
      rooms: [0, Validators.required],
      vacancies: [0, Validators.required],
      rent: [0, Validators.required],
      deposit: [0, Validators.required]
    });
    this.roomsgroup.push(roomGroup);
    // this.roomsgroup.push(this.fb.group(new Rooms()));
  }

  deleteRoom(index: number): void {
    this.roomsgroup.removeAt(index);
  }

  moveToNextStep(step: string) {
    document.getElementById(step)?.click();
  }

  formdetails() {
    const formData: FormData = new FormData();
    this.uploadedFiles.forEach(file => {
      console.log(file);
      formData.append('files', file, file.name);
    });

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    this.http.post('http://localhost:5000/upload/multiple', formData, { headers })
      .subscribe((response: any) => {
        this.imageurls = response.files.map((file: any) => file.downloadURL);
        this.nowsubmit();
      }, error => {
        console.error('Upload error:', error);
      });
  }

  nowsubmit() {
    const { title, address, about, city, tenantgender, ownername, ownercontact, owneremail } = this.propertyForm.controls;
    const addedRooms = this.propertyForm.get('roomsgroup')?.value;
    const addedAmenities = this.addedAmenities;
    const addedRules = this.addedRules;
    const images = this.imageurls;

    this.pgservice.addpg({
      title: title.value,
      address: address.value,
      city: city.value,
      about: about.value,
      owner: this.user,
      tenantgender: tenantgender.value,
      ownercontact: ownercontact.value,
      addedAmenities,
      addedRooms,
      addedRules,
      images,

    }).subscribe({
      next: (res) => {
        console.log('Property addition successful:', res);
      },
      error: (err) => {
        console.error('Error adding property:', err);
      }
    });
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);
      this.fileUrls.push(URL.createObjectURL(files[i]));
    }
    console.log(this.uploadedFiles);

  }

  getFileType(fileName: string): string {
    const extension = fileName.split('.').pop();
    if (extension) {
      return extension.toUpperCase();
    }
    return 'UNKNOWN';
  }
  geturl(file: File) {
    return window.URL.createObjectURL(file);
  }
  removeFile(file: File): void {
    this.uploadedFiles = this.uploadedFiles.filter(f => f !== file);
    this.fileUrls = this.fileUrls.filter(f => f != URL.createObjectURL(file));

  }
  // removealreadyfile(file: string) {
  //   this.pg.imageUrl = this.pg.imageUrl.filter(f => f != file);
  // }
  uploadFiles(): void {
    // Implement upload logic here
  }
  fileUrls: string[] = [];


  toggleAmenity(amenity: Amenity): void {
    const index = this.addedAmenities.findIndex(item => item.title === amenity.title);
    if (index > -1) {
      this.addedAmenities.splice(index, 1);
    } else {
      this.addedAmenities.push(amenity);
    }
  }
  ifinamenity(amenity: Amenity) {
    return this.addedAmenities.findIndex(item => item.title === amenity.title) > -1;
  }
  ifinrules(amenity: Amenity) {
    return this.addedRules.findIndex(item => item.title === amenity.title) > -1;
  }
  toggleRule(rule: Rule): void {
    const index = this.addedRules.findIndex(item => item.title === rule.title);
    if (index > -1) {
      this.addedRules.splice(index, 1);
    } else {
      this.addedRules.push(rule);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.propertyForm.get(controlName);
    if (control && control.touched && control.invalid) {
      if (control.errors?.required) {
        return 'This field is required';
      } else if (control.errors?.email) {
        return 'Enter a valid email';
      } else if (control.errors?.pattern) {
        return 'Enter a valid contact number';
      }
    }
    return '';
  }
}