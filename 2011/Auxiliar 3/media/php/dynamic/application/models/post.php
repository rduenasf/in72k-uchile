<?php
class Post extends CI_Model{
  
  function __construct()
  {
        // Call the Model constructor
        parent::__construct();
  }

  function find(){
    return $this->db->order_by('id', 'asc')->get('posts')->result_array();
  }
  
  function remove($id){
    $this->db->delete('posts', array('id' => $id));
  }
  
  function update($id, $title) {
    $this->db->where('id', $id);
    $this->db->update('posts', array('title' => $title));
  }
}