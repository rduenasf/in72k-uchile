<!DOCTYPE html>
<html>
<head>
  <title>Blog</title>
  <link rel="stylesheet" href="/css/style_dynamic.css">
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
  <script>!window.jQuery && document.write(unescape('%3Cscript src="js/libs/jquery-1.5.1.min.js"%3E%3C/script%3E'))</script>
  <script src="/js/script.js"></script>
  <script>
    $(document).ready(function (){
      
      $(".edit").click(function(e) {
        e.preventDefault();
        var edit = $(this);
        var text = $(this).prev();
        var input = $("<input>", { type: 'text', value: text.text() });
        var id = ($(this).parent().parent().attr('id'));
        
        $(this).hide();
        $(this).before(input);
        text.hide();
        
        input.focus().select().keyup( function(e) {
          if(e.keyCode == 13) {
            text.text(input.val());
            $.post('http://nodemysqlserver:8124/dynamic/ajax/update', {id: id, title: input.val() } );
            text.show();
            input.remove();
            edit.show();
          }
        });
      });
      
      $(".delete").click(function(e) {
        e.preventDefault();
        var id = ($(this).parent().parent().attr('id'));
        $(this).parent().parent().remove();
        $.post('http://nodemysqlserver:8124/dynamic/ajax/delete', {id: id } );
        $('.post_count').html(parseInt($('.post_count').html())-1);
      });
    });
  </script>
</head>
<body>
  <div id="container">
    <h1>Blog</h1>
    <p>Display all <span class='post_count'><?php echo $count; ?></span> post(s)</p>
    <div id="posts">
      <?php foreach($posts as $post): ?>
      <div class="post" id="<?php echo $post['id'];?>">
        <!-- title-->
        <h2>
          <span class="title"><?php echo $post['title']; ?></span>
          <a href="dynamic/post/undefined/edit" class="edit">Edit</a>
          <a href="dynamic/post/undefined/edit" class="edit delete">Delete</a>
        </h2>
        <!-- dates-->
        <p class="date created">Created at <?php echo $post['createdAt']; ?></p>
        <p class="date updated">Updated at <?php echo $post['updatedAt']; ?></p>
        <!-- body-->
        <pre class="body"><?php echo $post['body']; ?></pre>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</body>
</html>