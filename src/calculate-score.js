export default function calculateScore(taskName, data) {

    // get regex for item prefix based on task name
    const rawItemRegEx = RegExp(taskName + "_")

    // add each item's value to new object
    let recodedData = {}
    Object.keys(data).map((item) => {
        if (rawItemRegEx.test(item)) {
            recodedData[item.replace(rawItemRegEx, "")] = data[item].value
        }
    })
    // recode the items that need to be reverse coded
    const recodeItems = [1, 2, 6, 7, 8]
    recodeItems.map((item) => {
            const rawValue = data[taskName + '_' + item].value
            const recodedValue = 5 - rawValue

            recodedData[item] = recodedValue
        }
    )

    function pull_out(x) {
        var keys = Object.keys(x);
        var vals = keys.map(k => x[k].value);
        var out = [];
        for (var i = 0; i < keys.length; i++) {
            out.push({[keys[i]]: vals[i]});
        }
        return out;
    }

    // create new object for summary values
    console.log(data);
    const formatted_data = pull_out(data);
    console.log(formatted_data);
    const s = Object.values(recodedData).reduce((a, b) => {
        return parseInt(a, 10) + parseInt(b, 10)
    });
    const fullResult = {score: s, custom_study_results: JSON.stringify(formatted_data)};
    return fullResult
}