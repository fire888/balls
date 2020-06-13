import $ from 'jquery'

export const prepareHtml = data => {
    return new Promise(resolve => {
      $('#firstscreen').addClass('animate');
      $('#projectName').addClass('animate');
      $('.testpath').addClass('animate');
      $('#render').addClass('animate');
      $('#lang').addClass('animate');
      $('.nav-item').addClass('animate');
        
      $('#overlay0').addClass('showed');
      $('#overlay1').addClass('showed');
      $('#overlay2').addClass('showed');
      $('#overlay').addClass('showed');
      resolve(data)
    }) 
}