import React from 'react';

const Navigation = (props) => {

  const navLinks = props.pages.map((page) => {
    return (
      <li className={`link ${page.id === props.activePage ? 'active' : ''}`} key={page.id}>
        { page.title.rendered }
      </li>
    );
  });

  return (
    <div className="nav-container">
      <ul className="link-list">
        {navLinks}
      </ul>
    </div>
  );
}

export default Navigation;