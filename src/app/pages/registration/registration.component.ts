import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  selectedGender = '';
  selectedRoles: any = [];

  regisForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    ]),
    fullName: new FormControl(),
    gender: new FormControl(this.selectedGender),
    dob: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl(''),
    fb: new FormControl(''),
    linkIn: new FormControl(''),
    role: new FormControl(this.selectedRoles, Validators.required)
  })
  constructor(
    private formBuilder: FormBuilder
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
  }


  onRoleSelected(role: any) {
    role.selected = !role.selected;
    this.selectedRoles.push(role["name"]);
  }

  onRegistration() {
    this.regisForm.reset();
  }
}
