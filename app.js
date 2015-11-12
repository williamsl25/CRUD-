var page = {
  recipeUrl: 'http://tiny-tiny.herokuapp.com/collections/recipeClone',
  init: function () {
    page.initStyling();
    page.initEvents();
  },
  initStyling: function () {
    page.readrecipe();
  },
  initEvents: function () {
    $('form').on('submit', function (event) {
      event.preventDefault();
      var newrecipe = {
        title: $(this).find('input').val(),

        instructions: $(this).find('textarea').val()
      };

      page.createrecipe(newrecipe);
      $('.col-md-6').html('');
      page.readrecipe();

    });

    $('.col-md-6').on('click', '.btn-danger', function (event) {
      event.preventDefault();
      var recipeId = $(this).closest('article').data('recipeid');
      console.log(recipeId);
      page.deleterecipe(recipeId);
      $(this).closest('article').remove();

    });
    $('.col-md-6').on('click', '.btn-info', function (event) {
      event.preventDefault();
      $(this).closest('article').find('.editing').toggleClass('show');

    });
    $('.col-md-6').on('click', '.submitEdit', function (event) {
      event.preventDefault();
      var editedObj = {
          title: $(this).closest('article').find('.editing').find('input').val(),
          content: $(this).closest('article').find('.editing').find('textarea').val(),
          _id: $(this).closest('article').data('recipeid'),
      };
      page.updaterecipe(editedObj);

    });
  },
  createrecipe: function (newrecipe) {
    $.ajax({
      url: page.recipeUrl,
      method: 'POST',
      data: newrecipe,
      success: function (recipeData) {
        console.log(recipeData);
      },
      error: function (err) {
        console.log(err);
      }

    });
  },
  readrecipe: function () {

    $.ajax({
      url: page.recipeUrl,
      method: 'GET',
      success: function (recipeData) {
        console.log(recipeData);
        page.renderrecipes($('.col-md-6'), recipeData, templates.recipeTmpl);
      },
      error: function (err) {
        console.log(err);
      }

    });

  },
  renderrecipes: function ($el, recipesArray, tmpl) {
    var template = _.template(tmpl);
    _.each(recipesArray, function (el) {
      $el.append(template(el));
    });
  },
  updaterecipe: function (recipe) {
    $.ajax({
      url: page.recipeUrl + '/' + recipe._id,
      method: 'PUT',
      data: recipe,
      success: function (recipeData) {
        console.log(recipeData);
      },
      error: function (err) {
        console.log(err);
      }

    });
  },
  deleterecipe: function (recipeId) {
    $.ajax({
      url: page.recipeUrl + '/' + recipeId,
      method: 'DELETE',
      success: function (recipeData) {
        console.log(recipeData);
      },
      error: function (err) {
        console.log(err);
      }

    });
  },
  renderTemplate: function ($el, data, tmpl) {
    var template = _.template(tmpl);
    $el.html(template(data));
  }
};

$(document).ready(function () {
  page.init();
});
