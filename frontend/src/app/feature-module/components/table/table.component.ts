import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from 'src/app/service/http/http.service';
import { firstValueFrom } from 'rxjs';
import { REVIEW_ACTION_API, REVIEW_LISTING_API } from 'src/app/constant/api';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Output() editData: EventEmitter<any> = new EventEmitter();
  @Input() update: any;

  showLoader: boolean = true;
  reviewListings: Array<any> = [];
  pagination = {
    currentPage: 1,
    perPage: 5,
  };
  reviewTotalData!: number;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getReviewListing();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['update'].currentValue) {
      this.getReviewListing();
    }
  }

  async getReviewListing() {
    try {
      const responseData: any = await firstValueFrom(
        this.http.get(REVIEW_LISTING_API, this.pagination)
      );
      if (responseData.statusCode == 200) {
        this.reviewListings = responseData?.data?.data;
        this.reviewTotalData = responseData?.data?.totalReview;
      }
    } catch (error) {}
  }

  onPageChange(event: any) {
    this.pagination.perPage = +event.value;
    this.getReviewListing();
  }

  pageChange(type: number) {
    if (type == 0 && this.pagination.currentPage > 1) {
      this.pagination.currentPage -= 1;
      this.getReviewListing();
    } else if (
      this.pagination.currentPage * this.pagination.perPage <
      this.reviewTotalData
    ) {
      this.pagination.currentPage += 1;
      this.getReviewListing();
    }
  }

  actionButton(type: number, data: any) {
    if (type == 0) {
      this.editData.emit(data);
    } else {
      this.deleteData(data);
    }
  }

  async deleteData(data: any) {
    try {
      const responseData = await firstValueFrom(
        this.http.delete(REVIEW_ACTION_API(data?._id))
      );
      this.getReviewListing();
      console.log(responseData);
    } catch (error) {}
  }
}
