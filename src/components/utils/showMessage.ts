

export function showMessage(textMessage: string, error = false) {
  const message = document.createElement('div');
  message.classList.add('message');
  if (error) message.classList.add('message_error');
  document.body.append(message);
  message.innerHTML = textMessage;
  setTimeout( function () {
    document.body.removeChild(message);
  }, 4000);
  if (error) return true;
  return false;
}


