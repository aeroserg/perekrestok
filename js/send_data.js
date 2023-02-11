const URL_REQUEST_SERVER = 'https://staffjet.ru/response/custom_landing/'

$(document).ready(function () {
  $("#inputPhone").mask("+7(000)000-00-00");

  const msg_response_status = document.getElementById("messageResponseStatus");
  const send_button = document.getElementById("sendButton");
  const urlParams = new URLSearchParams(window.location.search);

  const response_status_alert = document.getElementById("responseStatusAlert");
  response_status_alert.style.display = "none";



  $("#formResponseCandidate").submit(function (event) {
    // Отключения кнопки отправки и вывод статуса отправки
    send_button.disabled = true;
    response_status_alert.style.display = "block";
    msg_response_status.innerHTML = "Идет отправка";

    // Формирование данных для запроса на сервер
    const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const request_data = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // Получение токена csrf из переменной {% csrf_token %}
        "X-CSRFToken": csrf_token
      },
      // Формирования тела запроса из данных формы и GET параметров урла
      body: JSON.stringify({
        first_name: $("#inputFirstName").val(),
        middle_name: $("#inputMiddleName").val(),
        surname: $("#inputSurname").val(),
        age: $("#inputAge").val() == "" ? null : $("#inputAge").val(),
        sex: $("#inputSex").val(),
        citizenship: $("#inputCitizenship").val(),
        education: $("#inputEducation").val(),
        driver_license: $("#inputDriverLicense").val() == "" ? null : $("#inputDriverLicense").val(),
        similar_experience: $("#inputSimilarExperience").val(),
        phone: $("#inputPhone").val(),
        email: $("#inputEmail").val(),
        city: $("#inputCity").val(),
        slug_lending: $("#inputSlugLending").val(),
        click_id: urlParams.get("click"),
        city_skillaz: urlParams.get("city_skillaz"),
        utm_source: urlParams.get("utm_source"),
        utm_content: urlParams.get("utm_content"),
        utm_term: urlParams.get("utm_term"),
        utm_middle: urlParams.get("utm_middle"),
      })
    }

    // Отправка запроса на сервер
    const response = fetch(URL_REQUEST_SERVER, request_data)
        .then((response) => {
          console.log("Статус код от сервера: " + response.status);

          // Возникла опшибка валидации отправленных параметров или объект на сервере не найден
          if (response.status == 400 || response.status == 404) {
            response.json().then((data) => {
              console.log("Данные ответа:");
              console.log(data);
            }).catch((err) => {
              console.log(err);
            })
          }

          if (response.status == 200) {
              console.log("Запрос отклонен, вероятно не передан заголовок X-CSRFToken, или передан неверный");
          }

          if (response.status == 204) {
            // Поведение страницы при успешном отклики
            msg_response_status.innerHTML = 'Спасибо за отклик.';
            event.target.reset();
          } else {
            // Поведение страницы при ошибки
            msg_response_status.innerHTML = "Отклик не был отправлен, попробуйте позже.";
          }
          document.getElementById("sendButton").disabled = false;
    });

    event.preventDefault();
  });
});
