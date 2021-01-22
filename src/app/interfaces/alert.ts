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

  success(title: string, message: string) {
    Swal.fire(title, message, 'success');
  }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: '¡Algo salió mal!',
      text: message,
    });
  }
}
