import React from 'react';

const List = (props) => props.list.map(item => <li key={item}>{item}</li>);

export default List;