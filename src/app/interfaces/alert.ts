// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

export class Alert {
  // Loading...
  loading() {
    function loading() {
      Swal.showLoading();
    }
    return loading();
  }
  // Hide loading
  closeLoading() {
    function close() {
      Swal.close();
    }
    return close();
  }

  // Success alert
  success(title: string, message: string) {
    Swal.fire(title, message, 'success');
  }

  // Error alert
  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: '¡Algo salió mal!',
      text: message,
    });
  }

  // Custom alert
  public mostrarAlerta(
    type: 'success' | 'info' | 'warning' | 'error',
    mainTitle?: string,
    detail?: string,
    life = 10000
  ) {
    Swal.fire({
      title: mainTitle,
      showConfirmButton: false,
      timer: life,
      position: 'top-end',
      text: detail,
      icon: type,
    });
  }

  // Confirm dialog
  confirmAlert() {
    return Swal.fire({
      title: '¿Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    });
  }
}
