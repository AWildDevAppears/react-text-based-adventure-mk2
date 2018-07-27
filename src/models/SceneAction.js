export const SCENE_ACTIONS = {
    CHANGE_ZONE: 'actionChangeZone',
        // zone = id
        // fixedTime = integer
        // incrementTime = integer
    CHANGE_SCENE: 'actionChangeScene',
        // scene = id
        // fixedTime = integer
        // incrementTime = integer
    SET_ZONE_VARIABLE: 'actionSetVariable',
        // prop = string
        // value = boolean | integer | string
        // scene = id
    LOOT_CONTAINER: 'actionLootContainer',
        // container = id
    TAKE_DAMAGE: 'actionTakeDamaqe',
        // scene = id
        // damage = number
}

export default class SceneAction {
    id = '';
    type = '';
    text = '';
    params = {};

    static fromData(object) {
        let act = object[0];
        let action = new SceneAction();

        action.id = act.sys.id;
        action.type = act.sys.contentType.sys.id;
        action.text = act.fields.text;

        switch (action.type) {
            case SCENE_ACTIONS.CHANGE_ZONE:
                action.params = {
                    zone: act.fields.zone.sys.id,
                    fixedTime: act.fields.fixedTime,
                    incrementTime: act.fields.incrementTime,
                };
                break;
            case SCENE_ACTIONS.CHANGE_SCENE:
                action.params = {
                    scene: act.fields.scene.sys.id,
                    fixedTime: act.fields.fixedTime,
                    incrementTime: act.fields.incrementTime,
                };
                break;
            case SCENE_ACTIONS.SET_ZONE_VARIABLE:
                action.params = {
                    prop: act.fields.prop,
                    value: act.fields.value,
                    scene: act.fields.scene.sys.id,
                };
                break;
            case SCENE_ACTIONS.LOOT_CONTAINER:
                action.params = {
                    container: act.fields.container.sys.id,
                };
                break;
            case SCENE_ACTIONS.TAKE_DAMAGE:
                action.params = {
                    damage: act.fields.damage,
                    scene: act.fields.scene.sys.id,
                };
                break;
            default:
        }

        return action;
    }
}
