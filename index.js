
export default function objectIsChange(newObject, oldObject) {
    for (let key in newObject) {

        let newValue = newObject[key];
        let oldValue = oldObject[key];

        if (newValue !== oldValue) {

            let type = typeof newValue;

            if (type === 'string'
            || type === 'number'
            || type === 'boolean'
            ) {
                return true;
            }

            try {
                newValue = JSON.stringify(newValue);
                oldValue = JSON.stringify(oldValue);
                if (newValue !== oldValue) {
                  return true;
                }
            }
            catch (e) {
                return true;
            }
        }
    }
    return false;
}