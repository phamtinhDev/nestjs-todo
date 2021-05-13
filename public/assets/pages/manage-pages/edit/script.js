$(function () {
  var $cancelButton = $('#cancelBtn');

  $.validator.setDefaults({
    submitHandler: function () {
      let data = {};
      let url = window.location.pathname;
      let id = url.substring(url.lastIndexOf('/') + 1);

      $('.input').each(function () {
        let key = this.name;
        let value = $(this).val();
        if (value) {
          data[key] = value;
        }
      });

      console.log('data: ', data);

      $.ajax({
        type: 'PUT',
        url: `/todo/${id}`,
        cache: 'false',
        data: data,
        success: function (result) {
          toastr.success(result.message);
          return window.location.replace('/todo');
        },
        error: function (error) {
          toastr.error(error.responseJSON.message);
        },
      });
    },
  });

  $('#quickForm').validate({
    rules: {
      taskName: {
        required: true,
      },
      piority: {
        required: true,
      },
      dueDate: {
        required: true,
      },
      description: {
        required: true,
      },
    },
    messages: {
      taskName: 'Trường này không được để trống',
      piority: 'Trường này không được để trống',
      dueDate: 'Trường này không được để trống',
      description: 'Trường này không được để trống',
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element) {
      $(element).removeClass('is-invalid');
    },
  });

  $cancelButton.click(function () {
    window.history.back();
  });
});
