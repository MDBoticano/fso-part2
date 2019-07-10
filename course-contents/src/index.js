import React from 'react'
import ReactDOM from 'react-dom'

// Node Packaged used to generate unique keys
import uuidv1 from 'uuid/v1'

const Course = (props) => {
  return(
    <>
      <Header course={props.course.name}/>
      <Content parts={props.course.parts}/>
    </>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const contentArray = (props.parts).map((part, i) => 
    <Part key={uuidv1()} part={part} />
  );
  return (
    <>
      {contentArray}
    </>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))