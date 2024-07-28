import React from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver'
import Swal from 'sweetalert2';

function UserAddButton({ title }) {

  const Token = (document.cookie.match(/(?:^|; )token=([^;]*)/) || [])[1];
  let cookieToken = null;
  if (Token) {
    cookieToken = JSON.parse(Token);
  }

  return (

    // Adding button in header
    <div className="col-auto float-right ml-auto">
      
            <button
              href="#"
              className="btn add-btn"
            >
              <i className="fa fa-plus" /> Add {title}
            </button>

    </div>
  )
}

export default UserAddButton