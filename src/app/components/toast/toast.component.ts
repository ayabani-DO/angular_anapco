import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Toast, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {

  toasts: (Toast & { id: number })[] = [];
  private sub!: Subscription;
  private counter = 0;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.sub = this.toastService.toast$.subscribe(toast => {
      const id = this.counter++;
      this.toasts.push({ ...toast, id });
      setTimeout(() => this.removeToast(id), toast.duration || 3000);
    });
  }

  removeToast(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
