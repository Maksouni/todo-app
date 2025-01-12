// alertManager.ts
type AlertType = 'success' | 'error' | 'info';

let alertCallback: ((message: string, type: AlertType) => void) | null = null;

export const setAlertCallback = (callback: (message: string, type: AlertType) => void) => {
  alertCallback = callback;
};

export const showAlert = (message: string, type: AlertType) => {
  if (alertCallback) {
    alertCallback(message, type);
  }
};
