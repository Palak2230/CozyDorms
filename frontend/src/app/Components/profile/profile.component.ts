import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  profileForm!: FormGroup;
  // url: string =;
  uploadedFile!: File;
  imageurl: string[] = [];
  url: string = '../../../assets/michael-dam-mEZ3PoFGs_k-unsplash.jpg';
  constructor(private http: HttpClient, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    const item = localStorage.getItem('User');
    const user = JSON.parse(item || '{}');
    this.user = user;

    this.profileForm = this.fb.group({
      image: [this.user.image, Validators.required],
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      contact: [this.user.contact, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
    console.log(this.user);
    this.url = this.user.image;
  }


  onfilechange(event: any): void {
    const file = event.target.files[0];
    this.uploadedFile = file;
    if (file) {
      this.url = URL.createObjectURL(file);
    }
  }

  onSubmit(): void {
    if (this.uploadedFile) {
      const formData: FormData = new FormData();
      formData.append('files', this.uploadedFile, this.uploadedFile.name);

      const headers = new HttpHeaders();
      headers.append('Accept', 'application/json');

      this.http.post('http://localhost:10000/upload/multiple', formData, { headers })
        .subscribe((response: any) => {
          this.imageurl = response.files.map((file: any) => file.downloadURL);
          this.updateUserProfile();
        }, error => {
          console.error('Upload error:', error);
        });
    } else {
      this.updateUserProfile();
    }
  }

  private updateUserProfile(): void {
    const image = this.imageurl[0] || this.url;
    console.log(image);
    const { name, email, contact } = this.profileForm.value;

    this.userService.updateUser(image, name, email, contact).subscribe({
      next: (res) => {
        console.log('User updated successfully:', res);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
