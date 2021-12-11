import React from 'react';

const List = (props) => props.list.map(item => <li>{item}</li>);

export default List;