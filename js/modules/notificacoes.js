export function mostrarToast(mensagem, tipo = "info") {
  if (window.Swal) {
    window.Swal.fire({
      toast: true,
      position: "top-end",
      icon: tipo,
      title: mensagem,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });

    return;
  }

  const toast = document.querySelector("#toast");

  if (!toast) return;

  toast.textContent = mensagem;
  toast.hidden = false;

  window.clearTimeout(mostrarToast.temporizador);

  mostrarToast.temporizador = window.setTimeout(() => {
    toast.hidden = true;
  }, 3000);
}