export default class BodyCopy {
    id = '';
    heading = '';
    content = '';

    static fromData(data) {
        data = data[0];
        let body = new BodyCopy();

        body.id = data.sys.id;
        body.heading = data.fields.heading;
        body.content = data.fields.content;

        return body;
    }
}