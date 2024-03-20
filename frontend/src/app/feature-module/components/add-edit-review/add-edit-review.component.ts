import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import {
  ADD_REVIEW_API,
  REVIEW_ACTION_API,
  REVIEW_EDIT_API,
} from 'src/app/constant/api';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-add-edit-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit-review.component.html',
  styleUrls: ['./add-edit-review.component.scss'],
})
export class AddEditReviewComponent implements OnChanges {
  @Input() editData: any;

  @Output() result: EventEmitter<any> = new EventEmitter();
  isEdit!: string;
  reviewForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private http: HttpService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editData'].currentValue) {
      this.reviewForm.patchValue(changes['editData'].currentValue);
      this.isEdit = changes['editData'].currentValue._id;
    }
  }

  cancelAction() {
    this.reviewForm.reset();
    this.result.emit(true);
  }

  async onSubmit() {
    if (this.isEdit) {
      this.editReview();
      return;
    }
    try {
      const responseData = await firstValueFrom(
        this.http.post(ADD_REVIEW_API, this.reviewForm.value)
      );
      if (responseData) {
        this.result.emit(responseData.message);
      }
    } catch (error) {}
  }

  async editReview() {
    const payLoad = {
      title: this.reviewForm.controls?.title.value,
      content: this.reviewForm.controls?.content.value,
      reviewId: this.isEdit,
    };
    try {
      const responseData = await firstValueFrom(
        this.http.patch(REVIEW_EDIT_API, payLoad)
      );
      this.result.emit(responseData.message);
      console.log(responseData);
    } catch (error) {}
  }
}
