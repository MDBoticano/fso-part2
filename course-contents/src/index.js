import React from 'react'
import ReactDOM from 'react-dom'

// Node package used to generate unique keys
import uuidv1 from 'uuid/v1'

const Course = ({course}) => {
  const exercises = course.parts.map(part => part.exercises);
  const total = exercises.reduce( (accumulator, sum) => accumulator + sum);

   return(
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total total={total}/>
    </>
  )
}

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  const contentList = () => parts.map(part => 
    <Part key={uuidv1()} part={part} />
  )
  
  return (
    <>
      {contentList()}
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({ total }) => {
  return(
    <strong>Total of {total} exercises</strong>
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
      }, 
      {
        name: 'Redux',
        exercises: 11
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