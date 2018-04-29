// @flow
import React from "react"
import scaleItems from "./autism-items.json"
import LikertQuestionnaire from "./likert-questionnaire"

const options = ["Definitely disagree", "Slightly disagree", "Slightly agree", "Definitely agree"]

const prompt = "Read each of the following statements very carefully and state"+
"how strongly you agree or disagree with it.\n"

export default function Scale(props: {endTask: (string, string) => void}) {
  window.scrollTo(0,0)
  return (
    <LikertQuestionnaire items={scaleItems}
                         taskName={"generic_scale"}
                         options={options}
                         page1Prompt={prompt}
                         continuedPrompt={prompt}
                         itemsPerPage={4}
                         endTask={props.endTask}
    />
  )
}
