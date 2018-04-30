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

    //rescore agree = 1 values
    const agr = [1, 3, 6, 7, 8, 11, 12, 15, 17] //indices (base 0 question #s)
    const agr_d = {"4": 1, "3": 1, "2": 0, "1": 0} //recode keys

    //rescore disagree = 1 values
    const disagr = [0, 2, 4, 5, 9, 10, 13, 14, 16, 18, 19] //indices
    const disagr_d = {"4": 0, "3": 0, "2": 1, "1": 1} // recode keys

    console.log("data");
    console.log(data);
    const l = Object.keys(data).length;
    for (var i = 0; i < l; i++) {
        let d = "generic_scale_"+(i+1);
        console.log(d)
        console.log(data[d])
        const val = data[d].value
        if (agr.includes(i)) {
            console.log(i + " in agr")
            recodedData[i.toString()] = agr_d[val.toString()]
        }
        else if (disagr.includes(i)) {
            console.log(i + " in disagr")
            recodedData[i.toString()] = disagr_d[val.toString()]
        }
        else {
            console.log("Indexing error.");
            console.log(i);
            console.log(val)
        }
        console.log(recodedData)
    }

    delete recodedData["20"];
    console.log("reformatted data");
    console.log(recodedData);

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
