export default class Scene {
    id = '';
    title = '';
    heading = '';
    body = [];
    actions = [];
    conditions = {};

    static convertValue(value) {
        switch (value) {
            case 'true':
                value = true;
                break;
            case 'false':
                value = false;
                break;
        }

        return value;
    }
}
