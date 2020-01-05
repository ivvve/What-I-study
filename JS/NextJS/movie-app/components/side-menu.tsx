import React from 'react';

const SideMenu = (prop: Readonly<{ count: number, shopName: string, func: Function }>) => {
  return (
    <div>
      <h1 onClick={() => prop.func()} className="my-4">{prop.shopName}</h1>
      <div className="list-group">
        <a href="#" className="list-group-item">Category 1</a>
        <a href="#" className="list-group-item">Category 2</a>
        <a href="#" className="list-group-item">Category 3</a>
      </div>

      <div>
        <span>{prop.count}</span>
      </div>
    </div>
  )
};

export default SideMenu;
