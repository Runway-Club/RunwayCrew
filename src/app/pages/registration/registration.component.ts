import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ProfileService } from 'src/app/services/profile.service';
import { RegistrationProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  selectedGender = '';
  selectedRoles: any = [];

  emailControl!: FormControl;
  nameControl!: FormControl;
  addressControl!: FormControl;
  genderControl!: FormControl;
  dobControl!: FormControl;
  phoneNumberControl!: FormControl;
  selectedRolesControl!: FormControl;
  facebookControl!: FormControl;
  linkInControl!: FormControl;

  registration: RegistrationProfile = {
    email: '',
    name: '',
    address: '',
    gender: '',
    dob: 0,
    phoneNumber: '',
    selectedRoles: [],
    facebook: '',
    linkIn: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private toast: NbToastrService,
    private router: Router
  ) { }

  rules = [
    '1. Ưu tiên hàng đầu của việc tham gia Runway Club là học hỏi thêm nhiều kiến thức, kỹ năng và tạo thêm nhiều mối quan hệ xã hội.',
    '2. Runway Club hoạt động phi lợi nhuận, được bảo trợ bởi Công ty TNHH Dịch Vụ Đào tạo và Giải pháp ITSS (aka. ITSS). Vì thế, các hoạt động của mỗi thành viên là tình nguyện và vì cộng đồng. Đôi khi, các thành viên sẽ có trợ cấp cho công việc của mình, tuy nhiên nó hoàn toàn phụ thuộc vào những gì bạn đã làm được.',
    '3. Các thành viên tham gia Runway Club không cần đóng bất kỳ khoản tiền nào.'
  ];

  roles = [
    {
      name: 'Runway ATC',
      description: 'Điều hành và kiểm soát sự hoạt động',
      image: '',
      selected: false
    },
    {
      name: 'Runway Developers',
      description: 'Tham gia các dự án Open Source của dự án',
      image: '',
      selected: false
    },
    {
      name: 'Runway Lightning',
      description: '',
      image: '',
      selected: false
    },
    {
      name: 'Runway Threshold',
      description: '',
      image: '',
      selected: false
    }
  ]

  ngOnInit(): void {
    this.emailControl = new FormControl(this.registration.email, [
      Validators.required,
      // Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    ]);
    this.nameControl = new FormControl(this.registration.name, Validators.required);
    this.addressControl = new FormControl(this.registration.address);
    this.genderControl = new FormControl(this.selectedGender);
    this.dobControl = new FormControl(this.registration.dob, Validators.required);
    this.phoneNumberControl = new FormControl(this.registration.phoneNumber, Validators.required);
    this.selectedRolesControl = new FormControl(this.selectedRoles, Validators.required);
    this.facebookControl = new FormControl(this.registration.facebook);
    this.linkInControl = new FormControl(this.registration.linkIn);
  }


  onRoleSelected(role: any) {
    role.selected = !role.selected;
    this.selectedRoles.push(role["name"]);
  }

  async onRegistration() {
    // if (this.emailControl.invalid || this.nameControl.invalid || this.dobControl.invalid || this.phoneNumberControl.invalid || this.selectedRolesControl.invalid) {
    //   this.toast.danger("Please re-check required fields in your form", "Submit Rejected");
    //   return;
    // }
    try {
      await this.profileService.create({
        address: this.addressControl.value,
        dob: this.dobControl.value,
        email: this.emailControl.value,
        gender: this.genderControl.value,
        phoneNumber: this.phoneNumberControl.value,
        selectedRoles: this.selectedRolesControl.value,
        facebook: this.facebookControl.value,
        linkIn: this.linkInControl.value,
        name: this.nameControl.value,

      });
      this.toast.success(`Welcome to Runway Club`, "Success");
      this.router.navigate(['profile'])
    }
    catch (err) {
      this.toast.danger(err);
    }
  }
}
