$(function () {
  function removeTask(ids) {
    if (!ids || ids.length <= 0) return;

    Swal.fire({
      title: 'Cảnh báo',
      text: 'Bạn có chắc chắn muốn xóa',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'DELETE',
          url: '/todo/remove',
          cache: 'false',
          data: { ids },
          success: function () {
            return window.location.reload();
          },
          error: function (error) {
            return toastr.error(error.responseJSON.message);
          },
        });
      }
    });
  }

  function updateTask(ids) {
    if (!ids || ids.length <= 0) return;

    $.ajax({
      type: 'PUT',
      url: '/todo',
      cache: 'false',
      data: { ids },
      success: function (result) {
        toastr.success(result.message);
        window.location.reload();
      },
      error: function (error) {
        return toastr.error(error.responseJSON.message);
      },
    });
  }

  $(document).on('click', '.btn-remove', function () {
    let ids = [];
    ids.push($(this).attr('page-id'));

    return removeTask(ids);
  });

  $('.btn-remove-task').on('click', function () {
    let ids = [];
    $('.checkbox').each(function () {
      if ($(this).is(':checked')) {
        ids.push($(this).attr('page-id'));
      }
    });

    return removeTask(ids);
  });

  $('.btn-done-task').on('click', function () {
    let ids = [];
    $('.checkbox').each(function () {
      if ($(this).is(':checked')) {
        ids.push($(this).attr('page-id'));
      }
    });

    return updateTask(ids);
  });

  $('.checkbox-all').click(function () {
    $('input.checkbox').not(this).prop('checked', this.checked);
  });
});
