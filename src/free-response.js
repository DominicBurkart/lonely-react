//@flow
import React from "react";
import {styled} from "styletron-react"
import {globalColors} from "./globals"

const Prompt = styled('div', {
  textAlign: "center",
  margin: "1em",
  fontWeight: "bold"
})
const ScaleContainer = styled('div', {
  display: "flex",
  justifyContent: "center"
})
const Scale = styled('div', {
  flex: "0 0 100px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column"
})
const Item = styled('label', (props: {isfocused: boolean, selected: boolean}) => ({
  display: "flex",
  fontSize: "0.8em",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: props.isfocused ? globalColors.otherColor :(
    props.selected
  )  ? (
    globalColors.mainColor) : globalColors.darkColor,
  color: globalColors.lightColor,
  border: "2px solid",
  borderColor: props.selected ? (globalColors.emphasisColor
      ):(globalColors.darkColor),
  boxShadow: "0 2px 0 0px " + globalColors.mainColor + ", 0 -2px 0 0px "
              + globalColors.mainColor,
  ':hover': props.selected ? null : {
    backgroundColor: globalColors.otherColor,
    borderColor: globalColors.mainColor
  },
  ':focus': {
    backgroundColor: globalColors.otherColor,
    borderColor: globalColors.mainColor
  },
  flex: "0 0 15px"
}))
const ItemEndLine = styled('div', {
  width: "2px",
  height: "19px",
  backgroundColor: globalColors.mainColor,
  boxShadow: "0 2px 0 0px " + globalColors.mainColor + ", 0 -2px 0 0px "
              + globalColors.mainColor
})

const styles = {
  optionRadio: {
    opacity: "0",
    height: "0",
    width: "0"
  },
  optionDescription: {
    margin: "0.5em",
    fontSize: "0.8em"
  },
  optionFreeResponse: {
    margin: "0.5em",
    fontSize: "0.8em",
  }
}

type freeProps = {
  options: Array<string>,
  prompt: string,
  returnSelected: (string, Object) => void,
  name: string,
  promptStyle: Object,
  scaleContainerStyle: Object,
  itemStyle: Object,
  RT: boolean
}

type freeState = {
  selectedOption: string,
  focused: number
}

class FreeResponse extends React.Component<freeProps, freeState> {
  selectOption: (SyntheticEvent<*>) => void
  Item: React$Node
  ScaleContainer: React$Node
  Prompt: React$Node
  blur: (SyntheticEvent<*>) => void
  focus: (SyntheticEvent<*>) => void
  startTime: number

  static defaultProps = {
    promptStyle: {},
    scaleContainerStyle: {},
    itemStyle: {},
    RT: false
  }

  constructor(props: freeProps){
    super(props)

    this.state = {
      selectedOption: -1,
      focused: -1
    }

    this.selectOption = this.selectOption.bind(this)
    this.focus = this.focus.bind(this)
    this.blur = this.blur.bind(this)

    this.Prompt = styled(Prompt, this.props.promptStyle)
    this.ScaleContainer = styled(ScaleContainer, this.props.scaleContainerStyle)
    this.Item = styled(Item, this.props.itemStyle)
  }

  componentDidMount(){
    this.startTime = performance.now()
  }

  selectOption(event: SyntheticEvent<*>) {
    this.blur(event)
    const reactionTime = performance.now() - this.startTime
    //console.log(event.target.value)
    if (!Number.isNaN(Number.parseInt(event.target.value))) {
      //console.log(event.target.value)
      this.setState({value: event.target.value})
      const returnData = this.props.RT ? {
        value: event.target.value,
        RT: reactionTime
      } : {
        value: event.target.value
      }
      console.log(returnData)
      this.props.returnSelected(this.props.name, returnData)
    }
  }

  focus(event){
    const newValue = event.target.value
    this.setState({focused: (newValue - 1) })
  }

  blur(event){
    this.setState({focused: -1})
  }

  render() {
    const { Prompt, ScaleContainer, Item } = this
    return (
      <div>
        <Prompt> {this.props.prompt} </Prompt>
        <input type="text" pattern="[0-9]*"
          onChange={this.selectOption}
          style={{borderColor:'gray', margin: "0.5em"}}/>
      </div>
    )
  }
}

export default FreeResponse
