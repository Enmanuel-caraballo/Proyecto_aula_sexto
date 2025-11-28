import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

type ToastColor = 'primary' | 'success' | 'warning' | 'danger' | 'medium' | 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toastCtrl: ToastController) {}

  async show(message: string, options?: { duration?: number; color?: ToastColor; icon?: string; position?: 'top' | 'middle' | 'bottom' }) {
    const toast = await this.toastCtrl.create({
      message,
      duration: options?.duration ?? 2500,
      color: options?.color ?? 'primary',
      icon: options?.icon,
      position: options?.position ?? 'top',
      buttons: [{ text: 'Cerrar', role: 'cancel' }]
    });
    await toast.present();
  }

  success(message: string, duration = 2500) { return this.show(message, { duration, color: 'success', icon: 'checkmark-circle' }); }
  error(message: string, duration = 3000) { return this.show(message, { duration, color: 'danger', icon: 'alert-circle' }); }
  info(message: string, duration = 2500) { return this.show(message, { duration, color: 'primary', icon: 'information-circle' }); }
  warning(message: string, duration = 3000) { return this.show(message, { duration, color: 'warning', icon: 'warning' }); }
}
