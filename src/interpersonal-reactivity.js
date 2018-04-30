// @flow
import React from "react"
import reactivityItems from "./interpersonal-reactivity-items.json"
import LikertQuestionnaire from "./likert-questionnaire"

const options = ["Does not describe me at all", "Does not describe me", "Describes me somewhat", "Describes me very well."]

export default function Loneliness(props: {endTask: (string, string) => void}) {
  window.scrollTo(0,0)
  return (
    <LikertQuestionnaire items={reactivityItems}
                         taskName={"interpersonalreactivityindex"}
                         options={options}
                         page1Prompt={"The following statements describe how people sometimes feel." +
                         " For each statement, please indicate how often you feel the way described.\n"}
                         continuedPrompt={"The following statements describe how people sometimes feel" +
                         " For each statement, please indicate how often you feel the way described.\n"}
                         itemsPerPage={4}
                         endTask={props.endTask}
    />
  )
}
