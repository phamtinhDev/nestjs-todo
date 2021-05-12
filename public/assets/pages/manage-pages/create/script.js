$(function () {
  let $cancelButton = $('#cancelBtn');
  let $formCreateTodo = $('#create_todo');

  $.validator.setDefaults({
    submitHandler: function () {
      var data = {
        taskName: $('input[name=taskName]').val(),
        piority: $('#piority').val(),
        dueDate: $('input[name=dueDate]').val(),
        description: $('#description').val(),
      };

      console.log('data: ', data);

      $.ajax({
        type: 'POST',
        url: '/todo',
        cache: 'false',
        data: data,
        success: function (result) {
          toastr.success(result.message);
          $formCreateTodo.trigger('reset');
        },
        error: function (error) {
          toastr.error(error.responseJSON.message);
        },
      });
    },
  });

  $formCreateTodo.validate({
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

  $('#dueDate').datetimepicker({
    icons: { time: 'far fa-clock' },
    format: 'HH:mm DD/MM/YYYY',
  });
});
