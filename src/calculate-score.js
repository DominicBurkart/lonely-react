
export default function calculateScore(taskName, data) {

  // get regex for item prefix based on task name
  const rawItemRegEx = RegExp(taskName + "_")

  // add each item's value to new object
  let recodedData = {}
  Object.keys(data).map((item) => {
    if (rawItemRegEx.test(item)){
      recodedData[item.replace(rawItemRegEx, "")] = data[item].value
    }
  })

  //rescore agree = 1 values
  const agr = [1, 3, 6, 7, 8, 11, 12, 15, 17] //indices (base 0 question #s)
  const agr_d = {4:1, 3:1, 2:0, 1:0} //recode keys

  //rescore disagree = 1 values
  const disagr = [0, 2, 4, 5, 9, 10, 13, 14, 16, 18, 19] //indices
  const disagr_d = {4:0, 3:0, 2:1, 1:1} // recode keys

  for (var i = 0; i < data.length; i += 1){
    const val = data[taskName+"_"+i]
    if (i in agr){
      recodedData[i] = agr_d[val].value
    }
    else if (i in disagr) {
      recodedData[i] = disagr_d[val].value
    }
    else{
      console.log("Indexing error.")
    }
  }

  // create new object for summary values
  let scaleSummary = {plotdata: {low: 28.5, high: 46.58, average: 40.08}}
  const totalScore = Object.values(recodedData).reduce((a,b) => { return parseInt(a, 10) + parseInt(b, 10) })
  scaleSummary.plotdata.score = totalScore

  const fullResult = Object.assign({}, data, scaleSummary)
  console.log(fullResult)
  return {[taskName]: fullResult}
}
