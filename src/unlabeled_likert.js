// @flow
import React from "react"
import scaleItems from "./likert_scale_items.json"
import LikertQuestionnaire from "./likert-questionnaire"

const options = ["None of the Time", "A Little of the Time", "Some of the Time",
                 "Most of the Time", "All of the Time"]

export default function Likert(props: {endTask: (string, string) => void}) {
  window.scrollTo(0,0)
  return (
    <LikertQuestionnaire items={scaleItems}
                         taskName={"unlabeled_likert"}
                         options={options}
                         page1Prompt={"People sometimes look to others for  "+
                         "companionship, assistance, or other types of " +
                         "support. How often is each of the following kinds of"+
                         " support available to you if you need it?\n"}
                         continuedPrompt={"People sometimes look to others for  "+
                         "companionship, assistance, or other types of " +
                         "support. How often is each of the following kinds of"+
                         " support available to you if you need it?\n"}
                         itemsPerPage={4}
                         endTask={props.endTask}
    />
  )
}
