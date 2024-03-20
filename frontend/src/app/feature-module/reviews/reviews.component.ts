import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../components/table/table.component';
import { AddEditReviewComponent } from '../components/add-edit-review/add-edit-review.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, TableComponent, AddEditReviewComponent],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
  showAddEdit: boolean = false;
  editReviewData: any;
  updateTable = false;

  editData(event: any) {
    this.editReviewData = { ...event };
    this.showAddEdit = true;
  }

  onDataEdit(event: any) {
    this.showAddEdit = false;
    this.editReviewData = undefined;
    this.updateTable = !this.updateTable;
  }

  addReview() {
    this.showAddEdit = !this.showAddEdit;
    this.editReviewData = undefined;
  }
}
