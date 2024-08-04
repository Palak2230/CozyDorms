import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, Form } from '@angular/forms';
// import { Rooms } from 'src/app/shared/models/rooms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PgService } from 'src/app/services/pg.service';
import { Rooms } from 'src/app/shared/models/rooms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { Observable } from 'rxjs';
import { Pg } from 'src/app/shared/models/pg';
import { User } from 'src/app/shared/models/User';
import { ActivatedRoute, Router } from '@angular/router';

interface Amenity {
    icon: string;
    title: string;
}

interface Rule {
    icon: string;
    title: string;
}

@Component({
    selector: 'app-editproperty',
    templateUrl: './editproperty.component.html',
    styleUrls: ['./editproperty.component.scss'],
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

export class EditpropertyComponent {
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

    imageUrls: string[] = [];
    // uploadForm: FormGroup;
    propertyForm !: FormGroup;
    rooms: any;
    pg!: Pg;
    user!: User;
    constructor(private fb: FormBuilder, private http: HttpClient, private pgservice: PgService, private activatedRoute: ActivatedRoute, private router: Router) {

        const item = localStorage.getItem('User');
        this.user = JSON.parse(item || '');




    }


    ngOnInit(): void {

        // console.log(this.propertyForm.invalid);
        let PgsObservable: Observable<Pg>;
        // console.log(this.activatedRoute);
        this.activatedRoute.params.subscribe((params: any) => {


            PgsObservable = this.pgservice.getPgById(params['searchTerm']);
            PgsObservable.subscribe((serverpgs) => {
                this.pg = serverpgs;
                if (!this.pg.owner || this.pg.owner.email != this.user.email) {
                    this.router.navigate(['/home']);

                }
                this.addedAmenities = this.pg.amenities;
                this.addedRules = this.pg.rules;


                this.propertyForm = this.fb.group({
                    title: [this.pg.name, Validators.required],
                    address: [this.pg.address, Validators.required],
                    city: [this.pg.city, Validators.required],
                    tenantgender: [this.pg.tenantgender, Validators.required],
                    about: [this.pg.about, Validators.required],

                    ownercontact: [this.pg.owner.contact, [Validators.required, Validators.pattern('^[0-9]+$')]],
                    addedAmenities: [this.addedAmenities],
                    addedRules: [this.addedRules],
                    roomsgroup: this.fb.array([]) // Initialize FormArray for rooms
                });
                this.pg.rooms.forEach((room) => {
                    const roomGroup = this.fb.group({
                        occupancy: [room.occupancy, Validators.required],
                        type: [room.type, Validators.required],
                        rooms: [room.rooms, Validators.required],
                        vacancies: [room.vacancies, Validators.required],
                        rent: [room.rent, Validators.required],
                        deposit: [room.deposit, Validators.required]
                    });
                    this.roomsgroup.push(roomGroup);
                })
                console.log(this.propertyForm);

            });


            // if (this.user !== this.pg.owner) {
            //   return;
            // }
            // console.log(this.pg);

        }
        )
    }




    get roomsgroup(): FormArray {
        // return this.propertyForm.get('roomsgroup') as FormArray;
        return this.propertyForm.controls["roomsgroup"] as FormArray;
    }

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



        this.imageurls = this.pg.imageUrl;
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        this.http.post('http://localhost:10000/upload/multiple', formData, { headers })
            .subscribe((response: any) => {
                response.files.forEach((file: any) => {
                    this.imageurls.push(file.downloadURL);
                });
                this.nowsubmit();
            }, error => {
                console.error('Upload error:', error);
            });

    }

    nowsubmit() {
        const { title, address, about, city, tenantgender, ownercontact } = this.propertyForm.controls;
        console.log(this.propertyForm);
        const addedRooms = this.propertyForm.get('roomsgroup')?.value;
        const addedAmenities = this.addedAmenities;
        const addedRules = this.addedRules;
        const images = this.imageurls;
        this.uploadedFiles = [];
        // images.push(this.imageurls);
        console.log(images);

        this.pgservice.editpg({
            title: title.value,
            address: address.value,
            city: city.value,
            about: about.value,
            tenantgender: tenantgender.value,
            owner: this.user,
            // ownername: ownername.value,
            ownercontact: ownercontact.value,
            // owneremail: owneremail.value,
            addedAmenities,
            addedRooms,
            addedRules,
            images
        }, this.pg.id).subscribe({
            next: (res) => {
                console.log('Property addition successful:', res);
                this.router.navigate(['/home']);
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
    removealreadyfile(file: string) {
        this.pg.imageUrl = this.pg.imageUrl.filter(f => f != file);
    }
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

    toggleRule(rule: Rule): void {
        const index = this.addedRules.findIndex(item => item.title === rule.title);
        if (index > -1) {
            this.addedRules.splice(index, 1);
        } else {
            this.addedRules.push(rule);
        }
    }
    ifinamenity(amenity: Amenity) {
        return this.addedAmenities.findIndex(item => item.title === amenity.title) > -1;
    }
    ifinrules(amenity: Amenity) {
        return this.addedRules.findIndex(item => item.title === amenity.title) > -1;
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
    //    preview() {
    //   frame.src = URL.createObjectURL(event.target.files[0]);
    // }
}
