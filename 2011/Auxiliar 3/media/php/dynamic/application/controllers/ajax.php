<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ajax extends CI_Controller {

  public function delete()
  {
    $this->load->model('post');
    $this->post->remove($this->input->post('id'));
  }
  
  public function update()
  {
    $this->load->model('post');
    $this->post->update($this->input->post('id'), $this->input->post('title'));
  }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */