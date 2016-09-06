
function isObject(obj) {
    return obj && typeof obj === 'object';
}

var level;
var maxLevel;

function isObjectChange(object1, object2) {
    level++;
    if (level > maxLevel) {
        return true;
    }
    var aKeys = Object.keys(object1).sort();
    var bKeys = Object.keys(object2).sort();
    if (isArrayChange(aKeys, bKeys)) {
        return true;
    }
    return aKeys.some(
        function (key) {

            var aValue = object1[key];
            var bValue = object2[key];

            // 对于对象或者数组
            // 优先进行子项对比
            // typeof array === 'object' 所以先测试数组
            if (Array.isArray(aValue) && Array.isArray(bValue)) {
                return isArrayChange(aValue, bValue);
            }
            else if (isObject(aValue) && isObject(bValue)) {
                return isObjectChange(aValue, bValue);
            }

            return aValue !== bValue;
        }
    );
}

function isArrayChange(array1, array2){
    if (array1.length !== array2.length) {
        return true;
    }
    return array1.some(
        function (item, index) {
            return item !== array2[index];
        }
    );
}

export default function objectIsChange(newObject, oldObject, max = 3) {

    if (newObject === oldObject) {
        return false;
    }

    if (!isObject(newObject) || !isObject(oldObject)) {
        return true;
    }

    level = 0;
    maxLevel = max;
    return isObjectChange(newObject, oldObject);

}