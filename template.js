var templates = {
  recipeTmpl: [
    '<article data-recipeid="<%= _id %>">',
    '<h2><%= title %></h2>',
    '<p>',
    '<%= instructions %>',
    '</p>',
    '<div class="action btn-group">',
      '<button class="btn btn-info">Edit</button>',
      '<button class="btn btn-danger">Delete</button>',
    '</div>',
    '<div class="editing">',
    '<input type="text" name="editTitle" class="editTitle" value="<%= title %>">',
    '<textarea name="editInstructions" class="editInstructions" rows="8" cols="40"><%= instructions %></textarea>',
      '<button type="button" class="submitEdit">submit recipe</button>',
    '</div>',
    '</article>'
  ].join('')
};
