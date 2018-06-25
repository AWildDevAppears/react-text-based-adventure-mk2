const person = new Character();

person.forename = 'Joe';
person.surname = 'Bloggs';
person.title = 'Mx';

person.health = 30;

it ('should show the users profile', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Profile for={person} />, div);
    ReactDOM.unmountComponentAtNode(div);
});