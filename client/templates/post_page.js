(function() {
Template.post_page.events = {
  'click input[type=submit]': function(e){
    e.preventDefault();

    var post_id = Session.get('selected_post_id');
    var $comment = $('#comment');
    var new_comment_id=Meteor.call('comment', post_id, null, $comment.val(), function(error, result){
      $("#"+result).removeClass("queued"); // does not work because new element is not yet in the DOM (probably)
    });
    $comment.val('');

  }
};

Template.post_page.show_comment_form = function(){
  return Meteor.user() !== null;
};

Template.post_page.post = function(){
  var post = Posts.findOne(Session.get('selected_post_id'));
  return post;
};

Template.post_page.body_formatted = function(){
  var converter = new Markdown.Converter();
  var html_body=converter.makeHtml(this.body);
  return html_body.autoLink();
}

Template.post_page.rendered = function(){
  t("post_page");
}

window.newCommentTimestamp=new Date();

})();