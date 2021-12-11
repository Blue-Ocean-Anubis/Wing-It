import React from 'react';

const List = (props) => props.list.map(item => <div key={item}>{item}</div>);

export default List;